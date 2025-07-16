<script lang="ts">
  import type { BlogPost } from '../../lib/app-types';
  import PostThumb from '../../lib/post-thumb.svelte';

  export let data: { posts: BlogPost[] };
  $: posts = data.posts;
</script>

<svelte:head>
  <title>UW Interactive Data Lab | Blog</title>
</svelte:head>

<div class="md:pr-10">
  {#each posts as post}
    <PostThumb {post} />
  {/each}
</div>
