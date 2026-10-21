import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const base = { title: z.string(), summary: z.string(), date: z.coerce.date(), updated: z.coerce.date().optional(), tags: z.array(z.string()).default([]), draft: z.boolean().default(false) };
const mk = (dir: string, extra = {}) => defineCollection({ loader: glob({ pattern: '**/*.md', base: `./src/content/${dir}` }), schema: z.object({ ...base, ...extra }) });
export const collections = {
  logs: mk('logs', { activity: z.string().optional(), odometer: z.number().optional(), fuel_litres: z.number().optional(), fuel_cost: z.number().optional() }),
  photos: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/photos' }), schema: z.object({ title: z.string(), date: z.coerce.date(), image: z.string(), alt: z.string(), caption: z.string().optional(), draft: z.boolean().default(false) }) }),
  experiments: mk('experiments', { result: z.string().optional() }),
  timeline: mk('timeline', { link: z.string().optional() }),
  reading: mk('reading', { author: z.string(), status: z.enum(['want', 'reading', 'finished']).default('want'), rating: z.number().min(1).max(5).optional() }),
  now: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/now' }), schema: z.object({ title: z.string(), updated: z.coerce.date() }) }),
  writing: mk('writing', { category: z.string().default('General') }),
  notes: mk('notes', { category: z.string().default('Miscellaneous') }),
  projects: mk('projects', { featured: z.boolean().default(false), repo: z.string().url().optional(), demo: z.string().url().optional(), tech: z.array(z.string()).default([]) }),
};
