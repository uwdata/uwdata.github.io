import type { BlogPost, BlogPostMeta } from "./app-types";
import { parse as parseYAML } from 'yaml';
import markdownit from 'markdown-it'

export function parsePostData(text: string, web_name: string): BlogPost {
  const parts = text.split("---\n");
  const metaRaw = parseYAML(parts.length == 3 ? parts[1] : "") as { [key: string]: any };
  if (!metaRaw.title) {
    console.error("Untitled blog post.")
  }
  const meta: BlogPostMeta = {
    date: metaRaw.date,
    display_date: metaRaw.date ? (new Date(metaRaw.date.replace(/-/g, "/") + " PST")).toLocaleDateString("us-EN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) : "Undated",
    title: metaRaw.title as string,
    web_name: web_name,
  }
  if (metaRaw.banner) meta.banner = metaRaw.banner;
  if (metaRaw.headliner) meta.headliner = metaRaw.headliner;
  if (metaRaw.external) meta.external = metaRaw.external;
  if (meta.external && !meta.headliner) {
    console.error("An external post must have a headliner.");
  }
  if (metaRaw.paper) meta.paper = metaRaw.paper;
  
  const post = parts.length == 3 ? parts[2] : parts[0];
  
  const md = markdownit({ html: true, linkify: true });
  const rendered_post = md.render(post)
  let first_image = meta.banner ?? rendered_post.match(/<img[^<>]*src="([^<>"]+)"[^<>]*>/i)?.[1] ?? null;
  if (first_image && first_image.startsWith("../")) first_image = first_image.replace("../", "");

  return { meta, post: rendered_post, first_image };
}

export function stripHTML(html: string) {
  // getting summary text for the blog
  return html.replace(/<[^<>]+>/g, "")
}