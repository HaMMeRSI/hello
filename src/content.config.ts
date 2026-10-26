import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Essays imported from ../Writings by scripts/import-writing.mjs.
const writing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    hook: z.string(),
    kicker: z.string(),
    // The part of the title painted red on the home page.
    emphasis: z.string(),
    order: z.number(),
  }),
});

export const collections = { writing };
