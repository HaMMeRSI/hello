// Pulls the finished essays out of ../Writings into src/content/writing,
// one markdown file per piece. Each piece lives there as numbered parts;
// here they become one post: the first part's heading is the title, the
// other part headings become sections. Array order is the site order.
//
//   node scripts/import-writing.mjs   (from the repo root)
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const pieces = [
  {
    dir: '1_Not Argue Money',
    slug: 'avoid-arguing-about-money',
    kicker: 'money',
    emphasis: 'arguing about money',
    title: 'How my wife and I avoid arguing about money',
    hook: 'A new month starts and nobody knows where the money went. We tried the spreadsheet, five apps and praying. Then we built our own.',
  },
  {
    dir: '2_The last skill',
    slug: 'the-last-human-skill',
    kicker: 'problem solving',
    emphasis: 'human skill',
    title: 'The last human skill standing',
    hook: 'AI can build anything. It still cannot see your problem for you. Nobody taught you how, so here is the thinking process.',
  },
  {
    dir: '3_Harnesses - Master AI',
    slug: 'how-ai-controls-your-computer',
    kicker: 'harnesses',
    emphasis: 'control your computer',
    title: 'How does that damn AI control your computer?',
    hook: 'A text-spitting machine moving your mouse. The trick is a piece of software called a harness, and you can understand it in ten minutes.',
  },
  {
    dir: '4_papp_bible',
    slug: 'how-to-build-personal-software',
    kicker: 'the guide',
    emphasis: 'personal software',
    title: 'How to build personal software in the AI era',
    hook: 'Everything you need to build a PaPP: the core principles, the five questions, the recipe. No code required.',
  },
];

for (const [index, piece] of pieces.entries()) {
  const partsDir = path.resolve('../Writings/Pieces', piece.dir, 'essay parts');
  const partNames = (await readdir(partsDir)).filter(name => name.endsWith('.md')).sort((a, b) => parseInt(a) - parseInt(b));
  const parts = await Promise.all(partNames.map(name => readFile(path.join(partsDir, name), 'utf8')));
  const body = parts.map((part, i) => (i ? part : part.slice(part.indexOf('\n') + 1)).trim().replaceAll(/^# /gm, '## ')).join('\n\n');

  await writeFile(
    path.resolve('src/content/writing', `${piece.slug}.md`),
    `---
title: ${JSON.stringify(piece.title)}
hook: ${JSON.stringify(piece.hook)}
kicker: ${JSON.stringify(piece.kicker)}
emphasis: ${JSON.stringify(piece.emphasis)}
order: ${index + 1}
---

${body}
`
  );
  console.log(`${piece.slug}: ${parts.length} parts`);
}
