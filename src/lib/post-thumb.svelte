<script lang="ts">
  import { base } from '$app/paths';
  import type { BlogPost } from './app-types';
  export let post: BlogPost;
</script>

<a
  href={post.meta.external ?? `${base}/blog/${post.meta.web_name}`}
  class="flex paper text-[15px] mb-6 thumb-wrap"
  target={post.meta.external ? '_blank' : '_self'}
>
  {#if post.first_image}
    <div class="thumbnail mb-2 md:mt-1 grow-0 shrink-0 mr-5">
      <div
        class="rounded-lg w-[120px] h-[80px] post-thumb-image"
        style={`background-image: url(${base}/${post.first_image})`}
      ></div>
    </div>
  {/if}
  <div class="leading-tight">
    <div class="md:block">
      <a class="font-semibold" href={post.meta.external ?? `${base}/blog/${post.meta.web_name}`}
        >{post.meta.title}</a
      >
      <div class="my-2 text-slate-500">{post.meta.headliner ?? post.post}...</div>
      <div class="text-[12px] text-slate-400">{post.meta.display_date}</div>
    </div>
  </div>
</a>

<style>
  .post-thumb-image {
    display: block;
    background-position: center center;
    background-size: cover;
  }
  .thumb-wrap:hover .post-thumb-image {
    box-shadow: 2px 2px 18px #8a5ed3;
  }
</style>
