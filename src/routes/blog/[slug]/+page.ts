import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageLoad } from './$types';
import { parsePostData } from '$lib/pasre-post';
import type { BlogPost, Paper } from '$lib/app-types';


export const load: PageLoad = async ({ params, fetch }) => {
  const web_name = params.slug;
  const post = await fetch(`${base}/blog-assets/posts/${web_name}.md`)
    .then((response) => response.text() as Promise<string>)
    .then((x) => {
      if (x) {
        const { meta, post, first_image } = parsePostData(x, web_name);
        return { post, meta, first_image };
      }
      return error(404, `Blog Post Not found`);
    })
    .catch((e) => {
      console.log(e);
      return error(500, e.message);
    });

  // find paper
  const paper = post.meta.paper ? await fetch(`${base}/papers/${post.meta.paper}.json`)
    .then((x) => x ? x.json() as Promise<Paper[]> : null) : null;
  
  const posts = await fetch(`${base}/blog-index.json`)
    .then((x) => x.json() as Promise<BlogPost[]>);

  const post_names = posts.map(x => x.meta.web_name);

  const recentPosts = posts.filter(x => x.meta.recent);

  // the post is sorted in the descending order of date (recent first)
  const prevPostIndex = post_names.indexOf(web_name) + 1;
  const prevPost = prevPostIndex >= 0 ? posts[prevPostIndex] : undefined;

  const nextPostIndex = post_names.indexOf(web_name) - 1;
  const nextPost = nextPostIndex < posts.length ? posts[nextPostIndex] : undefined;

  return { post, recentPosts, prevPost, nextPost, paper };
};
