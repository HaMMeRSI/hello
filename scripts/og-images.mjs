// Draws the 1200x630 link-preview images into public/og: default.png for
// every page, and blog/<slug>.png for each post, its title with the
// emphasis in blue like the home page cards. Text is drawn as SVG paths in
// the site's own fonts, so the result is the same on any machine.
//
//   pnpm og   (after import-writing)
import { mkdir, readdir, readFile } from 'node:fs/promises';
import opentype from 'opentype.js';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 72;
const BLUE = '#2657ff';
const DARK = '#0d1a2a';
const GRAY = '#596575';

// The CSS API hands plain TTF links to clients without a browser user agent.
async function loadFont(family, weight) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family.replaceAll(' ', '+')}:wght@${weight}`)).text();
  const font = opentype.parse(await (await fetch(css.match(/url\((.+?\.ttf)\)/)[1])).arrayBuffer());
  // opentype.js garbles glyphs running Nunito's substitutions; plain titles need none.
  delete font.tables.gsub;
  return font;
}

const titleFont = await loadFont('Nunito Sans', 900);
const footerFont = await loadFont('Nunito Sans', 600);
const kickerFont = await loadFont('Kalam', 700);

// opentype.js's toPathData writes NaN into some curves, so the commands are serialised here.
const COMMAND_POINTS = { M: ['x', 'y'], L: ['x', 'y'], Q: ['x1', 'y1', 'x', 'y'], C: ['x1', 'y1', 'x2', 'y2', 'x', 'y'], Z: [] };
function svgText(font, text, x, y, size, fill) {
  const commands = font.getPath(text, x, y, size).commands;
  const d = commands.map(command => command.type + COMMAND_POINTS[command.type].map(key => command[key].toFixed(2)).join(' ')).join('');
  return `<path fill="${fill}" d="${d}"/>`;
}

async function draw({ kicker, title, emphasis }, out) {
  // A word touching the emphasis is blue, so "your computer?" keeps its "?" blue too.
  const emphasisStart = title.indexOf(emphasis);
  const emphasisEnd = emphasisStart + emphasis.length;
  let offset = 0;
  const words = title.split(' ').map(text => {
    const start = offset;
    offset += text.length + 1;
    return { text, fill: start < emphasisEnd && start + text.length > emphasisStart ? BLUE : DARK };
  });

  // Wrap the words, shrinking the title until it fits in three lines.
  let size = 90;
  let lines;
  do {
    size -= 6;
    const space = titleFont.getAdvanceWidth(' ', size);
    lines = [[]];
    let x = 0;
    for (const word of words) {
      const width = titleFont.getAdvanceWidth(word.text, size);
      if (x > 0 && x + width > WIDTH - PAD * 2) {
        lines.push([]);
        x = 0;
      }
      lines.at(-1).push({ ...word, x });
      x += width + space;
    }
  } while (lines.length > 3);

  // Kicker and title sit centred in the band between the logo and the footer.
  const lineHeight = size * 1.08;
  const kickerSize = 38;
  const footerSize = 28;
  const bandTop = PAD + 64;
  const footerBaseline = HEIGHT - PAD;
  const blockHeight = kickerSize * 1.3 + lines.length * lineHeight;
  const blockTop = bandTop + (footerBaseline - footerSize - bandTop - blockHeight) / 2;
  const titleBaseline = blockTop + kickerSize * 1.3 + size * 0.95;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#fdfdfb"/>
    ${svgText(kickerFont, kicker, PAD, blockTop + kickerSize, kickerSize, BLUE)}
    ${lines.flatMap((line, i) => line.map(word => svgText(titleFont, word.text, PAD + word.x, titleBaseline + i * lineHeight, size, word.fill))).join('')}
    ${svgText(footerFont, 'sagihammer.com', PAD, footerBaseline, footerSize, GRAY)}
    <rect y="${HEIGHT - 14}" width="${WIDTH}" height="14" fill="${BLUE}"/>
  </svg>`;

  const logo = await sharp('public/logo/sh.svg', { density: 300 }).resize({ height: 64 }).png().toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: PAD, top: PAD }])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(out);
}

await mkdir('public/og/blog', { recursive: true });
await draw({ kicker: 'personal apps, built with AI', title: 'Nothing fits you but you.', emphasis: 'but you.' }, 'public/og/default.png');

for (const file of await readdir('src/content/writing')) {
  const source = await readFile(`src/content/writing/${file}`, 'utf8');
  const frontmatter = key => JSON.parse(source.match(new RegExp(`^${key}: (.+)$`, 'm'))[1]);
  await draw({ kicker: frontmatter('kicker'), title: frontmatter('title'), emphasis: frontmatter('emphasis') }, `public/og/blog/${file.replace('.md', '.png')}`);
}
