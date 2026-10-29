/* The stage behind the writing chapters: one WebGL canvas, sticky for
   the length of the section. Scroll position through the section drives
   everything, and every brick's pose is a pure function of it, so
   scrolling back up takes the build apart in exact reverse. Ported from
   ../orcaryn-lego, trimmed to what the bulb plan uses. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { brickGeometry } from './brick.js';

const { clamp, smoothstep, lerp } = THREE.MathUtils;
const BACKGROUND = new THREE.Color('#040404');
const FOG = 0.011; // per unit of distance; a plan scales it to its camera's reach
const FILL = 1.6; // the front fills; the sky bounce and the softer left fill scale from it
const SPOT = 5; // spotlight intensity before the finale dims it
const DROP = 5; // units a brick falls before it lands
const ROTATE_AT = 0.96; // scroll progress after which the model can be dragged around

/* stage: the section holding the canvas and the manual. scroller: the
   element that scrolls it. Returns a function that stops the loop and
   frees the GPU, for client-side navigation away from the page. */
export function run(plan, stage, scroller) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 720px)').matches;
  const canvas = stage.querySelector('canvas');

  let renderer;
  try {
    // Reversed depth: the blurred shadow map is stored in 16-bit floats,
    // and with a normal depth buffer the floor sits near 1.0 where those
    // floats are coarse, which turns the penumbra into a staircase.
    // Reversed depth puts the same surfaces near 0.0, where half floats
    // are far finer, and the edge comes out smooth.
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', reversedDepthBuffer: true });
  } catch {
    stage.classList.add('no-webgl');
    return () => {};
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap; // blurred maps: a penumbra, not a hard cut
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = plan.exposure;

  const scene = new THREE.Scene();
  scene.background = BACKGROUND.clone();
  scene.fog = new THREE.FogExp2(BACKGROUND.clone(), FOG);
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 500);

  /* ---------------------------------------------------- floor, light */
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), floorMaterial(renderer));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // The beam is the key and comes from behind, so the faces the camera
  // sees need their own light: a sky-and-ground bounce that keeps the
  // shadows from going black, a cool fill from front right and a warmer,
  // softer one from front left, so a brick's three visible faces each
  // land on a different tone. None of these cast shadows.
  const sky = new THREE.HemisphereLight('#aeb6c6', '#2a2521', FILL * 0.45);
  const fill = new THREE.DirectionalLight('#cfd8ff', FILL);
  fill.position.set(30, 18, 40);
  const fill2 = new THREE.DirectionalLight('#ffe9d2', FILL * 0.55);
  fill2.position.set(-36, 30, 28);
  scene.add(sky, fill, fill2);

  const spot = new THREE.SpotLight('#fff3e2', SPOT, 0, plan.light.angle, 0.55, 0);
  spot.position.set(...plan.light.pos);
  spot.target.position.set(...plan.light.target);
  spot.castShadow = true;
  spot.shadow.mapSize.setScalar(small ? 1024 : 2048);
  spot.shadow.bias = -0.0004;
  spot.shadow.normalBias = 0; // the floor's bump map would push every pixel's sample a different way, and the edge turns to a stain
  spot.shadow.radius = 4; // the blur, in texels
  spot.shadow.blurSamples = 16;
  spot.shadow.intensity = 0.82; // the beam reaches a little way into its own shadow
  spot.shadow.camera.near = 5;
  spot.shadow.camera.far = 200;
  scene.add(spot, spot.target);

  /* --------------------------------------------------------- bricks */
  const plastic = new THREE.MeshPhysicalMaterial({ roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12 });
  // frosted glass: solid, and the light shows as the shell's own glow
  const glass = new THREE.MeshPhysicalMaterial({ roughness: 0.3, clearcoat: 0.25, clearcoatRoughness: 0.3, emissive: '#ffb347' });
  // the filament: pale and dull until it comes on
  const bulb = new THREE.MeshPhysicalMaterial({ color: '#fff2c4', roughness: 0.1, clearcoat: 1, emissive: '#ffc861' });
  // polished metal: it shows only what it reflects, so it needs reflections
  const metal = new THREE.MeshPhysicalMaterial({ metalness: 1, roughness: 0.2, clearcoat: 0.4, clearcoatRoughness: 0.15 });
  const materials = { plastic, glass, bulb, metal };

  // Reflections: a soft studio room for the glossy surfaces to mirror.
  // Metal is all reflection, so it gets a strong one. The frosted glass
  // gets almost none: the room's ceiling lights are far brighter than
  // white, and a lit shell mirroring them would bloom into a fireball.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  for (const [material, strength] of [
    [plastic, 0.3],
    [glass, 0.12],
    [metal, 1],
    [bulb, 0.4],
  ]) {
    material.envMap = envMap;
    material.envMapIntensity = strength;
  }

  // Each step owns a slice of build progress; the last step gets more.
  // Pre-placed steps are down before the first scroll.
  const weights = plan.steps.map((_, k) => (k < plan.prePlaced ? 0 : k === plan.steps.length - 1 ? plan.finalWeight : 1));
  const totalWeight = weights.reduce((a, b) => a + b);
  let weightSoFar = 0;
  const stepStart = weights.map(w => {
    const start = weightSoFar / totalWeight;
    weightSoFar += w;
    return start;
  });

  const bricks = plan.steps.flatMap((step, k) =>
    step.map((s, j) => {
      const len = weights[k] / totalWeight;
      const t0 = k < plan.prePlaced ? -2 : stepStart[k] + len * 0.55 * (j / step.length);
      const t1 = k < plan.prePlaced ? -1 : t0 + len * 0.45;
      return {
        ...s,
        t0,
        t1,
        to: new THREE.Vector3(s.x + s.w / 2, s.y, s.z + s.d / 2),
        spin: Math.sin(k * 7.13 + j * 12.9898) * 0.6,
      };
    })
  );

  // one instanced mesh per brick size and material
  const meshes = [...Map.groupBy(bricks, br => `${br.w}x${br.d}|${br.round}|${br.mat}`).values()].map(group => {
    const { w, d, round, mat } = group[0];
    const mesh = new THREE.InstancedMesh(brickGeometry(w, d, round), materials[mat], group.length);
    mesh.castShadow = mat !== 'glass' && mat !== 'bulb';
    mesh.receiveShadow = true;
    mesh.frustumCulled = false; // instances move; the bounds would go stale
    group.forEach((br, index) => {
      br.mesh = mesh;
      br.index = index;
      mesh.setColorAt(index, new THREE.Color(br.color));
    });
    mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);
    return mesh;
  });

  /* -------------------------------------------------------- finale */
  // A lamp inside the bulb throws a pool on the floor, and a halo sprite
  // sits over it. The lamp casts no shadow: VSM maps don't exist for
  // point lights. Bloom turns the halo and the lit shell, both brighter
  // than white, into light rather than a flat clipped patch; it is a few
  // full-screen passes, so the scene is drawn straight until the bulb is on.
  const lamp = new THREE.PointLight('#ffcf7a', 0, 0, 1);
  const glow = glowSprite('#ffc46b', plan.lantern.glow);
  lamp.position.set(...plan.lantern.center);
  glow.position.set(...plan.lantern.center);
  scene.add(lamp, glow);
  const haze = new THREE.Color(plan.haze);
  const warm = new THREE.Color(plan.lantern.warm);

  const composer = new EffectComposer(renderer);
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0, 0.45, 1);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------------------------------------------------------- input */
  const listeners = new AbortController();
  const { signal } = listeners;

  // how far through the section we are: 0 with its top at the top of the
  // viewport, 1 with its bottom at the bottom
  const scrollProgress = () => {
    const { top, height } = stage.getBoundingClientRect();
    return clamp(-top / (height - canvas.clientHeight), 0, 1);
  };
  let targetProgress = scrollProgress();
  let progress = targetProgress;
  scroller.addEventListener('scroll', () => (targetProgress = scrollProgress()), { passive: true, signal });

  function resize() {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    targetProgress = scrollProgress();
  }
  addEventListener('resize', resize, { signal });
  resize();

  // Pointer: a little parallax always; once the build is finished, a drag
  // turns the model. The drag adds yaw and pitch on top of the scripted
  // camera; scrolling back up eases both back to zero.
  const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0 };
  const orbit = { yaw: 0, pitch: 0, yawSpeed: 0, pitchSpeed: 0, dragId: null, lastX: 0, lastY: 0 };
  let canRotate = false;

  addEventListener(
    'pointerdown',
    e => {
      if (!canRotate || e.button > 0 || e.target.closest('a, nav, .ws-card')) return;
      orbit.dragId = e.pointerId;
      orbit.lastX = e.clientX;
      orbit.lastY = e.clientY;
      stage.classList.add('dragging');
    },
    { signal }
  );
  addEventListener(
    'pointermove',
    e => {
      if (!reduceMotion) {
        pointer.x = e.clientX / innerWidth - 0.5;
        pointer.y = e.clientY / innerHeight - 0.5;
      }
      if (e.pointerId !== orbit.dragId) return;
      orbit.yawSpeed = -(e.clientX - orbit.lastX) * 0.008;
      // touch keeps vertical moves for scrolling (touch-action: pan-y)
      orbit.pitchSpeed = e.pointerType === 'touch' ? 0 : (e.clientY - orbit.lastY) * 0.003;
      orbit.yaw += orbit.yawSpeed;
      orbit.pitch += orbit.pitchSpeed;
      orbit.lastX = e.clientX;
      orbit.lastY = e.clientY;
    },
    { passive: true, signal }
  );
  const endDrag = e => {
    if (e.pointerId !== orbit.dragId) return;
    orbit.dragId = null;
    if (reduceMotion) orbit.yawSpeed = orbit.pitchSpeed = 0;
    stage.classList.remove('dragging');
  };
  addEventListener('pointerup', endDrag, { signal });
  addEventListener('pointercancel', endDrag, { signal });

  /* ----------------------------------------------------------- hint */
  const scrollHint = stage.querySelector('[data-hint]');

  /* ----------------------------------------------------------- loop */
  const pose = new THREE.Object3D();
  const lookAt = new THREE.Vector3();
  const timer = new THREE.Timer();
  let raf = 0;

  function placeBricks(build) {
    for (const br of bricks) {
      const t = (build - br.t0) / (br.t1 - br.t0);
      pose.position.copy(br.to);
      pose.rotation.set(0, 0, 0);
      pose.scale.setScalar(1);
      if (t <= 0) {
        pose.scale.setScalar(0);
      } else if (t < 1 && br.hang) {
        // clips onto the underside of an overhang: rise up into it
        pose.position.y -= Math.min(2.4, br.to.y) * (1 - t) ** 3;
        pose.scale.setScalar(Math.min(1, 0.55 + t * 2.5));
      } else if (t < 1) {
        // fall, accelerating, then one small settle bounce
        const fall = Math.min(t / 0.78, 1);
        const settle = (t - 0.78) / 0.22;
        pose.position.y += t < 0.78 ? DROP * (1 - fall * fall) : 0.16 * Math.sin(Math.PI * settle) * (1 - settle);
        pose.rotation.y = (1 - fall) * br.spin;
        pose.scale.setScalar(Math.min(1, 0.55 + t * 2.5));
      }
      pose.updateMatrix();
      br.mesh.setMatrixAt(br.index, pose.matrix);
    }
    for (const mesh of meshes) mesh.instanceMatrix.needsUpdate = true;
  }

  function placeCamera(p, time, dt) {
    // scripted path: orbit keyframes, eased between neighbours. `mt` is
    // the portrait target: the desktop hero frames the brick beside the
    // headline, a phone has no room for that.
    const keys = plan.camera;
    let i = 0;
    while (i < keys.length - 2 && p > keys[i + 1].p) i++;
    const A = keys[i],
      B = keys[i + 1];
    const u = smoothstep(p, A.p, B.p);
    const portrait = camera.aspect < 1;
    lookAt.set(...((portrait && A.mt) || A.t)).lerp(new THREE.Vector3(...((portrait && B.mt) || B.t)), u);
    const radius = lerp(A.r, B.r, u),
      height = lerp(A.h, B.h, u),
      angle = lerp(A.a, B.a, u);

    // drag to rotate, with a little glide after release
    if (canRotate !== p >= ROTATE_AT) {
      canRotate = p >= ROTATE_AT;
      stage.classList.toggle('can-rotate', canRotate);
    }
    const decay = Math.pow(0.9, dt * 60);
    if (!canRotate) {
      orbit.yaw *= decay;
      orbit.pitch *= decay;
      orbit.yawSpeed = orbit.pitchSpeed = 0;
    } else if (orbit.dragId === null) {
      orbit.yaw += orbit.yawSpeed;
      orbit.pitch += orbit.pitchSpeed;
      orbit.yawSpeed *= decay;
      orbit.pitchSpeed *= decay;
    }

    // a portrait screen pulls back to fit the model, and thins the fog by
    // the same factor so the model doesn't drown in it
    const pullBack = portrait ? Math.pow(1 / Math.max(camera.aspect, 0.5), 0.9) : 1;
    scene.fog.density = (FOG * (plan.fog ?? 1)) / pullBack;

    pointer.smoothX += (pointer.x - pointer.smoothX) * 0.05;
    pointer.smoothY += (pointer.y - pointer.smoothY) * 0.05;
    const yaw = angle + orbit.yaw + pointer.smoothX * 0.08 + (reduceMotion ? 0 : Math.sin(time * 0.12) * 0.04);
    const distance = Math.hypot(radius, height) * pullBack;
    const baseElevation = Math.atan2(height, radius);
    const elevation = clamp(baseElevation + orbit.pitch, 0.04, 1.1); // above the floor, short of straight down
    orbit.pitch = elevation - baseElevation;
    camera.position.set(
      lookAt.x + Math.sin(yaw) * Math.cos(elevation) * distance,
      lookAt.y + Math.sin(elevation) * distance - pointer.smoothY * 0.8,
      lookAt.z + Math.cos(yaw) * Math.cos(elevation) * distance
    );
    camera.lookAt(lookAt);
  }

  // The filament lights, the shell warms and glows with it, the room
  // takes the haze colour, and its own lights step back so the bulb is
  // the one source. Returns how far on it is.
  function switchOn(p) {
    const on = smoothstep(p, ...plan.lantern.range);
    const dim = 1 - on * 0.8;
    bulb.emissiveIntensity = on * 6;
    glass.emissiveIntensity = 0.03 + on * 0.9;
    glass.color.setScalar(1).lerp(warm, on);
    lamp.intensity = on * 10;
    glow.material.opacity = on * 0.3;
    bloom.strength = on * 0.5;
    spot.intensity = SPOT * dim;
    sky.intensity = FILL * 0.45 * dim;
    fill.intensity = FILL * dim;
    fill2.intensity = FILL * 0.55 * dim;
    scene.background.copy(BACKGROUND).lerp(haze, on);
    scene.fog.color.copy(scene.background);
    return on;
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const { top, bottom } = canvas.getBoundingClientRect();
    // the site header turns dark while the stage is under it
    document.documentElement.classList.toggle('on-stage', top <= 0 && bottom > 0);
    if (top >= innerHeight) return; // still up in the hero: nothing to draw

    timer.update(now);
    const dt = Math.min(timer.getDelta(), 0.1);
    const time = timer.getElapsed();

    progress = reduceMotion ? targetProgress : progress + (targetProgress - progress) * (1 - Math.pow(0.925, dt * 60));
    if (Math.abs(targetProgress - progress) < 1e-5) progress = targetProgress;
    const build = clamp((progress - plan.build[0]) / (plan.build[1] - plan.build[0]), 0, 1);

    placeBricks(build);
    placeCamera(progress, time, dt);
    const on = switchOn(progress);

    scrollHint.classList.toggle('gone', progress > 0.02);

    if (on > 0) composer.render();
    else renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    listeners.abort();
    document.documentElement.classList.remove('on-stage');
    composer.dispose();
    renderer.dispose();
  };
}

/* A soft round glow drawn over everything, starting invisible. */
function glowSprite(color, size) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const g = canvas.getContext('2d');
  const gradient = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, depthTest: false, opacity: 0 })
  );
  sprite.scale.set(size, size, 1);
  sprite.renderOrder = 10;
  return sprite;
}

/* The floor's surface: dark, fine-grained, crazed like old leather. */
function floorMaterial(renderer) {
  const N = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = N;
  const g = canvas.getContext('2d');
  g.fillStyle = '#7a7a7a';
  g.fillRect(0, 0, N, N);
  let seed = 11;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 2600; i++) {
    let x = random() * N,
      y = random() * N;
    g.strokeStyle = `rgba(0,0,0,${0.15 + random() * 0.35})`;
    g.lineWidth = 0.6 + random();
    g.beginPath();
    g.moveTo(x, y);
    for (let k = 0; k < 4; k++) {
      x += (random() - 0.5) * 16;
      y += (random() - 0.5) * 16;
      g.lineTo(x, y);
    }
    g.stroke();
  }
  for (let i = 0; i < 2500; i++) {
    g.fillStyle = `rgba(255,255,255,${random() * 0.12})`;
    g.fillRect(random() * N, random() * N, 1.5, 1.5);
  }
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(110, 110);
  map.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const bumpMap = map.clone();
  bumpMap.colorSpace = THREE.NoColorSpace;
  return new THREE.MeshStandardMaterial({ color: '#3a3a3a', map, bumpMap, bumpScale: 1.4, roughness: 0.88 });
}
