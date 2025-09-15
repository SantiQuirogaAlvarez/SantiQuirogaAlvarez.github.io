
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    // Optional per-post layout wrapper for content rendering
    layout: z.enum(["BlogNoteLayout", "BlogNoteLayoutAlt"]).optional(),
  }),
});

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  blog,
  notes,
};
