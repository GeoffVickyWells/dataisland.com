import type { APIContext } from "astro";
import { getPosts } from "../lib/blog";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// RSS 2.0 feed of every published post, for feed readers and aggregators.
export async function GET({ site }: APIContext) {
  const posts = await getPosts();
  const items = posts
    .map((post) => {
      const link = new URL(`/blog/${post.id}`, site).href;
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <dc:creator>${escape(post.data.author)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>DataIsland Blog</title>
    <link>${new URL("/blog", site).href}</link>
    <atom:link href="${new URL("/rss.xml", site).href}" rel="self" type="application/rss+xml" />
    <description>Practical writing, cooking and Mac tips from DataIsland Software.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
