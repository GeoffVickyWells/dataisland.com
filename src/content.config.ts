import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts are Markdown files in src/content/blog. The file name is the URL: foo.md → /blog/foo
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    // One or two sentences. Used as the deck under the title, the search-result snippet and the card text.
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Geoff Wells"),
    // Topic slugs from src/lib/blog.ts. The first one is the post's main topic.
    topics: z.array(z.string()).min(1),
    // Product ids from src/data/products.js. Each gets an app card at the end of the post.
    apps: z.array(z.string()).default([]),
    // Optional photo or screenshot under /public. Without one, the post gets a generated cover.
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    // Drafts build in `npm run dev` only, never into the live site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
