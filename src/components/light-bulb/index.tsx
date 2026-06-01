import { useEffect, useRef } from 'react';
import './index.css';
import brushBottomBlue from '../../assets/lightbulb/assets/brush_bottom_blue.png';
import brushPaleBlue from '../../assets/lightbulb/assets/brush_pale_blue.png';
import bulbFilaments from '../../assets/lightbulb/assets/bulb_filaments.png';
import bulbFull from '../../assets/lightbulb/assets/bulb_full.png';
import bulbInnerHighlightArc from '../../assets/lightbulb/assets/bulb_inner_highlight_arc.png';
import doodleArrowLeftDashed from '../../assets/lightbulb/assets/doodle_arrow_left_dashed.png';
import doodleBlueStar from '../../assets/lightbulb/assets/doodle_blue_star.png';
import doodleCircle from '../../assets/lightbulb/assets/doodle_circle.png';
import doodleDiagonalArrows from '../../assets/lightbulb/assets/doodle_diagonal_arrows.png';
import doodleDiamond from '../../assets/lightbulb/assets/doodle_diamond.png';
import doodleSparkLeft from '../../assets/lightbulb/assets/doodle_spark_left.png';
import doodleTinyDot from '../../assets/lightbulb/assets/doodle_tiny_dot.png';
import doodleTinyX from '../../assets/lightbulb/assets/doodle_tiny_x.png';
import doodleVerticalDots from '../../assets/lightbulb/assets/doodle_vertical_dots.png';
import doodleXLarge from '../../assets/lightbulb/assets/doodle_x_large.png';
import paintInsideBulbBlue from '../../assets/lightbulb/assets/paint_inside_bulb_blue.png';

type LightbulbParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  spin: number;
  life: number;
  max: number;
  color: string;
};

type LightbulbLayer = {
  className: string;
  src: string;
};

type DeviceOrientationEventConstructor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

const lightbulbLayers: LightbulbLayer[] = [
  { className: 'lb-brush-pale', src: brushPaleBlue },
  { className: 'lb-brush-bottom', src: brushBottomBlue },
  { className: 'lb-paint-inside', src: paintInsideBulbBlue },
  { className: 'lb-bulb', src: bulbFull },
  { className: 'lb-filaments', src: bulbFilaments },
  { className: 'lb-arc', src: bulbInnerHighlightArc },
  { className: 'lb-doodle lb-circle', src: doodleCircle },
  { className: 'lb-doodle lb-spark-left', src: doodleSparkLeft },
  { className: 'lb-doodle lb-diag-arrows', src: doodleDiagonalArrows },
  { className: 'lb-doodle lb-diamond', src: doodleDiamond },
  { className: 'lb-doodle lb-right-arrow', src: doodleArrowLeftDashed },
  { className: 'lb-doodle lb-x-large', src: doodleXLarge },
  { className: 'lb-doodle lb-tiny-dot', src: doodleTinyDot },
  { className: 'lb-doodle lb-tiny-x', src: doodleTinyX },
  { className: 'lb-doodle lb-vertical-dots', src: doodleVerticalDots },
  { className: 'lb-doodle lb-blue-star', src: doodleBlueStar },
];

const clampMotion = (value: number) => Math.max(-1, Math.min(1, value));

export function LightbulbStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let mx = 0,
      my = 0;
    let tx = 0,
      ty = 0;
    let raf: number;
    let gyroActive = false;
    let gyroOrigin: { beta: number; gamma: number } | undefined;
    const OrientationEvent = window.DeviceOrientationEvent as DeviceOrientationEventConstructor | undefined;

    const setTarget = (x: number, y: number) => {
      tx = clampMotion(x);
      ty = clampMotion(y);
    };

    const onMove = (e: MouseEvent) => {
      setTarget((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2);
    };

    const onGyro = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;
      if (beta === null || gamma === null) return;

      gyroOrigin ??= { beta, gamma };
      setTarget((gamma - gyroOrigin.gamma) / 18, (beta - gyroOrigin.beta) / 22);
    };

    const startGyro = () => {
      if (gyroActive) return;
      gyroActive = true;
      gyroOrigin = undefined;
      window.addEventListener('deviceorientation', onGyro);
    };

    const enableGyro = () => {
      if (!OrientationEvent) return;

      if (typeof OrientationEvent.requestPermission !== 'function') {
        startGyro();
        return;
      }

      void OrientationEvent.requestPermission()
        .then(permission => {
          if (permission === 'granted') startGyro();
        })
        .catch(() => undefined);
    };

    const tick = () => {
      mx += (tx - mx) * 0.12;
      my += (ty - my) * 0.12;
      const el = stageRef.current;
      if (el) {
        el.style.setProperty('--mx', mx.toFixed(4));
        el.style.setProperty('--my', my.toFixed(4));
      }
      raf = requestAnimationFrame(tick);
    };

    const prefersCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    window.addEventListener('mousemove', onMove);

    if (prefersCoarsePointer && OrientationEvent) {
      if (typeof OrientationEvent.requestPermission === 'function') {
        window.addEventListener('pointerdown', enableGyro, { once: true, passive: true });
      } else {
        startGyro();
      }
    }

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointerdown', enableGyro);
      if (gyroActive) window.removeEventListener('deviceorientation', onGyro);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const scene = stageRef.current;
    const canvas = particlesRef.current;
    if (!scene || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let particles: LightbulbParticle[] = [];
    let raf = 0;
    let burstTimer: number | undefined;
    const resize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = () => {
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      const cx = width * 0.49;
      const cy = height * 0.42;
      const count = 70;

      for (let i = 0; i < count; i++) {
        const angle = -Math.PI * 0.92 + Math.random() * Math.PI * 1.84;
        const speed = 1.2 + Math.random() * 5.4;
        const blue = Math.random() > 0.36;

        particles.push({
          x: cx + (Math.random() - 0.5) * 120,
          y: cy + (Math.random() - 0.5) * 80,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.6,
          vy: Math.sin(angle) * speed - 1.6,
          r: blue ? 1 + Math.random() * 3.6 : 0.9 + Math.random() * 2.2,
          rot: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.16,
          life: 0,
          max: 92 + Math.random() * 72,
          color: blue ? 'rgba(67,85,219,' : 'rgba(0,0,0,',
        });
      }
    };

    const tick = () => {
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.life++;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.018;
        particle.vx *= 0.992;
        particle.vy *= 0.993;
        particle.rot += particle.spin;

        const fade = Math.max(0, 1 - particle.life / particle.max);
        const alpha = Math.min(0.8, fade * 0.78);

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rot);
        ctx.fillStyle = `${particle.color}${alpha})`;
        if (Math.random() > 0.5) {
          ctx.fillRect(-particle.r * 1.6, -particle.r * 0.55, particle.r * 3.2, particle.r * 1.1);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, particle.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      particles = particles.filter(particle => particle.life < particle.max);
      raf = requestAnimationFrame(tick);
    };

    resize();
    burstTimer = window.setTimeout(burst, 1250);
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.clearTimeout(burstTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="lightbulb-stage" ref={stageRef} role="img" aria-label="Animated creative spark illustration">
      <canvas className="lb-particles" ref={particlesRef} aria-hidden="true" />
      <span className="lb-glow" />
      <span className="lb-halo" />

      {lightbulbLayers.map(({ className, src }) => (
        <img key={className} className={`lb-asset ${className}`} src={src} alt="" decoding="async" />
      ))}

      <span className="lb-micro lb-one" />
      <span className="lb-micro lb-two" />
      <span className="lb-micro lb-three" />
      <span className="lb-micro lb-four" />
    </div>
  );
}
