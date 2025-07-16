import { base } from '$app/paths';
import type { BlogPost } from '$lib/app-types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const posts = await fetch(`${base}/blog-index.json`)
    .then((x) => x.json() as Promise<BlogPost[]>);

  return { posts };
};
