/* Shared pieces for build plans. Plans are plain data with no Three.js
   import, so Astro can read them at build time to print real counts. */
export const H = 1.2; // one brick layer, in stud units

/* The brand red from the icon. Glossy, deep, slightly cool. */
export const RED = '#B8061E';

/* x, z: the brick's minimum corner in studs. layer: whole brick layers;
   y is the same height in units, for the engine. */
export function brick(x, layer, z, w, d, color, extra = {}) {
  return { x, layer, y: layer * H, z, w, d, color, mat: 'plastic', ...extra };
}

export function chunk(list, n) {
  const out = [];
  for (let i = 0; i < list.length; i += n) out.push(list.slice(i, i + n));
  return out;
}

/* Pack one layer of a voxel grid into real brick sizes.
   cells[layer][i][k] is a colour or null; grid cell (i, k) is the stud
   at (ox + i, oz + k). A brick only holds if at least one of its studs or
   tubes meets a brick in the layer above or below; touching a neighbour
   from the side holds nothing. So every brick must cover an anchored
   cell: one with something above or below it. A cell that can't be
   anchored is left out of the model, and cleared from the grid so the
   layers after it see the truth.
   `spread(i, k, ly)`: cells with a higher value are packed earlier, among
   cells equally anchored. `lay(a, b)`: the order the layer's bricks go on. */
const SIZES = [
  [2, 8],
  [2, 6],
  [1, 8],
  [2, 4],
  [1, 6],
  [2, 3],
  [1, 4],
  [2, 2],
  [1, 3],
  [1, 2],
  [1, 1],
];
export function packLayer(cells, ly, { ox, oz, spread = () => 0, lay = (p, q) => p.x - q.x }) {
  const here = cells[ly],
    below = cells[ly - 1],
    above = cells[ly + 1];
  const anchored = (i, k) => !!(below?.[i]?.[k] || above?.[i]?.[k]);
  const used = here.map(row => row.map(() => false));
  const alongX = ly % 2 === 0;

  // Of all placements of all sizes that cover cell (i, k), the best one:
  // resting on the layer below first (it can simply be put on top during
  // the build), then bigger, then more connections.
  function bestPlacement(i, k, sameColour) {
    let best = null;
    for (const [a, b] of SIZES) {
      for (const [w, d] of a === b
        ? [[a, b]]
        : alongX
          ? [
              [b, a],
              [a, b],
            ]
          : [
              [a, b],
              [b, a],
            ]) {
        for (let x0 = i - w + 1; x0 <= i; x0++)
          for (let z0 = k - d + 1; z0 <= k; z0++) {
            let fits = true,
              anchors = 0,
              rests = 0;
            for (let di = 0; di < w && fits; di++)
              for (let dk = 0; dk < d && fits; dk++) {
                const c = here[x0 + di]?.[z0 + dk];
                if (!c || used[x0 + di][z0 + dk] || (sameColour && c !== here[i][k])) fits = false;
                else {
                  if (anchored(x0 + di, z0 + dk)) anchors++;
                  if (below?.[x0 + di]?.[z0 + dk]) rests++;
                }
              }
            const score = (rests ? 1e6 : 0) + w * d * 1e3 + anchors;
            if (fits && anchors && (!best || score > best.score)) best = { x0, z0, w, d, score };
          }
      }
    }
    return best;
  }

  // Cells with nothing above or below go first, so they can claim a long
  // brick reaching back to something that holds them.
  const order = [];
  here.forEach((row, i) =>
    row.forEach((c, k) => {
      if (c) order.push([i, k]);
    })
  );
  order.sort((p, q) => anchored(...p) - anchored(...q) || spread(...q, ly) - spread(...p, ly));

  const out = [];
  for (const [i, k] of order) {
    if (used[i][k]) continue;
    const pick = bestPlacement(i, k, true) ?? bestPlacement(i, k, false);
    if (!pick) {
      here[i][k] = null;
      continue;
    }
    for (let di = 0; di < pick.w; di++) for (let dk = 0; dk < pick.d; dk++) used[pick.x0 + di][pick.z0 + dk] = true;
    out.push(brick(ox + pick.x0, ly, oz + pick.z0, pick.w, pick.d, here[i][k]));
  }
  return out.sort(lay);
}

/* Build order: at every turn, the first remaining brick that can attach
   to what is already built: on the floor, on top of a brick, or clipped
   under an overhang. One that clips on underneath is marked `hang`, so
   the engine raises it into place instead of dropping it through the
   brick above. Anything never reachable from the floor is left out.
   Takes the bricks out of `remaining` as it goes. */
export function attachOrder(remaining) {
  const placed = new Set(); // "layer,x,z" of every cell already built
  const touches = (b, ly) => {
    for (let x = b.x; x < b.x + b.w; x++) for (let z = b.z; z < b.z + b.d; z++) if (placed.has(`${ly},${x},${z}`)) return true;
    return false;
  };
  const order = [];
  for (;;) {
    const i = remaining.findIndex(b => b.layer === 0 || touches(b, b.layer - 1) || touches(b, b.layer + 1));
    if (i < 0) break;
    const [b] = remaining.splice(i, 1);
    if (b.layer > 0 && !touches(b, b.layer - 1)) b.hang = true;
    for (let x = b.x; x < b.x + b.w; x++) for (let z = b.z; z < b.z + b.d; z++) placed.add(`${b.layer},${x},${z}`);
    order.push(b);
  }
  return order;
}
