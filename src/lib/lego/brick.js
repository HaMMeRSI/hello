/* Procedural brick geometry, in stud units: 1 unit is one stud pitch
   (8 mm on a real brick), so a brick is 1.2 tall (9.6 mm) and a stud is
   0.3 in radius (4.8 mm wide) and 0.2125 tall (1.7 mm). Bricks look fake
   fast when these drift. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const HEIGHT = 1.2;
const GAP = 0.03; // the hairline between neighbouring bricks
const STUD_R = 0.3;
const STUD_H = 0.2125;

// stud silhouette, bottom to top, with a small rounded shoulder
const STUD_PROFILE = [
  [STUD_R, 0],
  [STUD_R, STUD_H - 0.045],
  [STUD_R - 0.012, STUD_H - 0.012],
  [STUD_R - 0.045, STUD_H],
  [0, STUD_H],
].map(([x, y]) => new THREE.Vector2(x, y));

/* w studs along x, d studs along z; a round brick is a cylinder w wide.
   Origin at the centre of the bottom face, so a brick's position is where
   it sits. */
export function brickGeometry(w, d, round) {
  const body = round ? new THREE.CylinderGeometry((w - GAP) / 2, (w - GAP) / 2, HEIGHT - GAP, 40).toNonIndexed() : new RoundedBoxGeometry(w - GAP, HEIGHT - GAP, d - GAP, 3, 0.045);
  body.translate(0, (HEIGHT - GAP) / 2, 0);

  const parts = [body];
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < d; j++) {
      // the rounded box comes out non-indexed; the merge needs both alike
      const stud = new THREE.LatheGeometry(STUD_PROFILE, 24).toNonIndexed();
      stud.translate(i - (w - 1) / 2, HEIGHT - GAP, j - (d - 1) / 2);
      parts.push(stud);
    }
  }
  return mergeGeometries(parts);
}
