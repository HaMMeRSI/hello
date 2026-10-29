/* Variant E: a light bulb that switches on at the end.
   It stands upright on its contact, the way a bulb sits in a socket: the
   blue brick from the opening shot is that contact. Above it, a black
   insulator, a threaded silver screw base, then a clear glass globe on a
   short stem, with a filament of round bricks in the middle. Each layer is
   a disc sampled onto the stud grid; the globe is hollowed to a one-stud
   shell and packed into real brick sizes like the orca. When the last
   bricks close the top, the filament comes on and the room goes warm. */
import { H, chunk, packLayer, attachOrder } from './util.js';

const BLUE = '#1E4FE6', // the site blue, a shade deeper so it reads as glossy plastic
  BLACK = '#1C1D21',
  SILVER = '#C3C8CE',
  STEEL = '#8E959E';
const GLASS = '#E6F0F4',
  STEM = '#F2F6F7',
  FILAMENT = '#FFF2C4'; // the glass is cool until it is lit

// Outer radius of each layer, in studs: the contact (a radius of 1 is
// just the middle 2x2), the insulator, then the screw base, whose threads
// are layers that change width. The globe starts at the neck.
const BASE = [1, 1.9, 3.3, 2.8, 3.3, 2.8, 3.3, 3.3];
const GLOBE = [3.3, 3.9, 4.7, 5.5, 6.2, 6.7, 7.0, 7.2, 7.2, 7.0, 6.6, 6.0, 5.1, 3.8, 2.3];
const FIRST_GLASS = BASE.length,
  TOP = FIRST_GLASS + GLOBE.length - 1;
const STEM_TOP = FIRST_GLASS + 3,
  FILAMENT_TOP = STEM_TOP + 3;

const N = 16,
  O = -N / 2; // grid cell (i, k) is the stud at (O + i, O + k)
const dist = (i, k) => Math.hypot(O + i + 0.5, O + k + 0.5); // from the bulb's axis
const disc = (R, colour) => Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, k) => (dist(i, k) <= R ? colour : null)));

const solid = [...BASE.map((R, L) => disc(R, L === 0 ? BLUE : L === 1 ? BLACK : L % 2 ? STEEL : SILVER)), ...GLOBE.map(R => disc(R, GLASS))];

// The globe keeps a one-stud shell: a cell stays if an empty cell is next
// to it, or nothing is above or below it. It also stays where it is the
// only thing between a shell cell above and one below, so a step in the
// curve never leaves the layer above sitting on air. The base stays solid.
const edges = solid.map(layer =>
  layer.map((row, i) =>
    row.map((c, k) => {
      if (!c) return false;
      for (let di = -1; di <= 1; di++) for (let dk = -1; dk <= 1; dk++) if (!layer[i + di]?.[k + dk]) return true;
      return false;
    })
  )
);
const cells = solid.map((layer, L) =>
  L < FIRST_GLASS
    ? layer
    : layer.map((row, i) =>
        row.map((c, k) => {
          if (!c) return null;
          if (edges[L][i][k] || !solid[L + 1]?.[i][k] || !solid[L - 1][i][k]) return c;
          if (edges[L + 1]?.[i][k] || (L > FIRST_GLASS && edges[L - 1][i][k])) return c;
          return null;
        })
      )
);

// inside the globe, in the middle 2x2: a clear stem up from the base,
// then the filament
for (let L = FIRST_GLASS; L <= FILAMENT_TOP; L++)
  cells[L].forEach((row, i) =>
    row.forEach((_, k) => {
      if (dist(i, k) < 1) row[k] = L <= STEM_TOP ? STEM : FILAMENT;
    })
  );

// Odd layers pack from the outside in. Each layer goes on around the
// circle, starting from the front.
const around = b => Math.atan2(b.x + b.w / 2, b.z + b.d / 2);
const remaining = [];
for (let L = 0; L <= TOP; L++) {
  const packed = packLayer(cells, L, {
    ox: O,
    oz: O,
    spread: (i, k, L) => (L % 2 ? dist(i, k) : 0),
    lay: (p, q) => around(p) - around(q),
  });
  for (const b of packed) {
    if (b.color === SILVER || b.color === STEEL) b.mat = 'metal';
    if (b.color === GLASS || b.color === STEM) b.mat = 'glass';
    if (b.color === FILAMENT) Object.assign(b, { mat: 'bulb', round: b.w === 2 && b.d === 2 });
    remaining.push(b);
  }
}
const order = attachOrder(remaining);

const steps = [
  order.filter(b => b.layer === 0),
  ...chunk(
    order.filter(b => b.layer > 0 && b.layer < FIRST_GLASS),
    4
  ),
  ...chunk(
    order.filter(b => b.layer >= FIRST_GLASS && b.layer < TOP),
    9
  ),
  order.filter(b => b.layer === TOP),
];

export default {
  steps,
  prePlaced: 1, // the contact is down before the first scroll
  finalWeight: 3, // the bricks that close the top get three steps of scroll
  build: [0.06, 0.9],
  exposure: 1.25,
  light: { pos: [-30, 52, -25], target: [0, 12, 0], angle: 0.38 },
  camera: [
    { p: 0.0, mt: [0, 1.6, 0], t: [-3.2, 0.6, -0.4], r: 14, h: 5, a: 0.15 },
    { p: 0.16, t: [0, 4, 0], r: 22, h: 8, a: 0.4 },
    { p: 0.4, t: [0, 9, 0], r: 34, h: 12, a: 0.8 },
    { p: 0.65, t: [0, 14, 0], r: 42, h: 15, a: 1.2 },
    { p: 0.86, t: [0, 14, 0], r: 56, h: 12, a: 1.5 },
    { p: 1.0, t: [0, 10, 0], r: 84, h: 7, a: 1.75 }, // aimed low, so the bulb sits above the end card
  ],
  // The far end of the camera path is long, so the room's fog is thinned
  // to match: at full density the finished bulb would be half haze.
  fog: 0.5,
  // The bulb comes on over the last stretch of scroll. The glow is the
  // whole globe's, so it sits at the globe's middle, not the filament's.
  lantern: { center: [0, (FIRST_GLASS + GLOBE.length / 2) * H, 0], range: [0.92, 0.99], glow: 24, warm: '#ffcf8f' },
  haze: '#1f1307',
};
