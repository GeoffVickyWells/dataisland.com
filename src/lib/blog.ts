import { getCollection, type CollectionEntry } from "astro:content";
import { products } from "../data/products.js";

export type Post = CollectionEntry<"blog">;

// Every topic a post can use. Each one gets its own page at /blog/topic/<slug>.
export const topics: Record<string, { label: string; blurb: string; tint: string; ink: string }> = {
  writing: {
    label: "Writing",
    blurb: "Drafting, editing and getting words onto the page on a Mac.",
    tint: "#e6f3ff",
    ink: "#0077cc",
  },
  languages: {
    label: "Languages",
    blurb: "Writing, reading and working in more than one language.",
    tint: "#efe9ff",
    ink: "#5b3fc4",
  },
  cooking: {
    label: "Cooking & Baking",
    blurb: "Conversions, substitutions and recipe maths for home cooks and bakers.",
    tint: "#fff3d6",
    ink: "#a86500",
  },
  "mac-tips": {
    label: "Mac Tips",
    blurb: "Small things about macOS that make a big difference day to day.",
    tint: "#e8f5ee",
    ink: "#2e8b57",
  },
  privacy: {
    label: "Privacy",
    blurb: "Keeping your data on your own Mac, and why it matters.",
    tint: "#f7f3e9",
    ink: "#6b5a2e",
  },
  essays: {
    label: "Essays",
    blurb: "How we think software should work, and why.",
    tint: "#e4f4f4",
    ink: "#167a7a",
  },
  publishing: {
    label: "Publishing",
    blurb: "Taking a manuscript all the way to ePub and print.",
    tint: "#ffe9ec",
    ink: "#b3263e",
  },
};

export function topicInfo(slug: string) {
  return topics[slug] ?? { label: slug, blurb: "", tint: "#f5f5f5", ink: "#333" };
}

export function productInfo(id: string) {
  return products.find((p) => p.id === id);
}

// Drafts show while running `npm run dev` so they can be previewed, never in a production build.
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function readingMinutes(post: Post): number {
  const words = (post.body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

// Posts sharing the most topics and apps with this one, newest first among equals.
export function relatedPosts(post: Post, all: Post[], count = 3): Post[] {
  const score = (other: Post) =>
    other.data.topics.filter((t) => post.data.topics.includes(t)).length +
    other.data.apps.filter((a) => post.data.apps.includes(a)).length;
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .slice(0, count)
    .map(({ p }) => p);
}

// The long-form guides live under /tutorials as hand-built pages; the blog links to them as well.
export const guides = [
  {
    href: "/tutorials/epub-author",
    title: "Are You an ePub Author?",
    blurb: "From FusionMD manuscript to a published ebook on Apple Books and Amazon KDP.",
    app: "fusionmd",
  },
  {
    href: "/tutorials/print-author",
    title: "Are You Ready to Go to Print?",
    blurb: "Tag once, export to IDML, and put a real paperback in front of readers.",
    app: "fusionmd",
  },
  {
    href: "/tutorials/international-trade",
    title: "Writing for International Trade",
    blurb: "Write in English or French and reach trading partners in their own language.",
    app: "polywrite",
  },
];
