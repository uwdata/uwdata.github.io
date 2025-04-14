<script lang="ts">
  import { base } from '$app/paths';
  import type { BlogPost, Paper } from '$lib/app-types';
  import { hostname } from '$lib/hostname';
  import Markdown from '$lib/markdown.svelte';
  import PostThumb from '$lib/post-thumb.svelte';
  export let data: {
    post: BlogPost;
    recentPosts: BlogPost[];
    prevPost?: BlogPost;
    nextPost?: BlogPost;
    paper: Paper;
  };
  $: content = data.post.post;
  $: meta = data.post.meta;
  $: recentPosts = data.recentPosts;
  $: prevPost = data.prevPost;
  $: nextPost = data.nextPost;
  $: top_image = data.post.first_image;
  $: url = `${hostname}${base}/blog/${meta.web_name}`;
  $: paper = data.paper;
  async function copyLink() {
    await navigator.clipboard.writeText(url);
    alert('Copied the URL to clipboard.');
  }
  console.log(paper);
</script>

<svelte:head>
  <title>UW Interactive Data Lab | Blog</title>
  <!-- add citation metadata -->
  {#if meta.title}<meta property="og:title" content={meta.title} />{/if}
  <meta property="og:type" content="article" />
  <meta property="og:url" content={url} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@uwdata" />
  {#if meta.title}<meta property="twitter:title" content={meta.title} />{/if}
  {#if top_image}<meta
      property="twitter:image"
      content={`${hostname}/${top_image.replace('../', '')}`}
    />{/if}
  {#if meta.title}<meta name="citation_title" content={meta.title} />{/if}
  {#if meta.date}<meta name="date" content={meta.date} />{/if}
</svelte:head>

{#if meta.banner}
  <div class="banner mb-5">
    <img src={meta.banner} alt="" />
  </div>
{/if}

{#if meta.title}<h1>{meta.title}</h1>{/if}

{#if meta.date}<p class="date">{meta.display_date}</p>{/if}

{#if meta.paper}
  <p class="related-paper">
    Related paper:
    <a href={`${hostname}${base}/papers/${meta.paper}`}>
      {paper.authors
        .map((a, i, arr) => (i == arr.length - 1 ? '& ' : '') + a.last_name)
        .join(', ')}.
      {paper.title}.
      <em>{paper.venue}, {paper.year}.</em>
    </a>
  </p>
{/if}

{#if !meta.external}
  <Markdown {content} />
{:else}
  This is an external post. Click <a href={meta.external} target="_blank">here</a> for redirection.
{/if}

<!-- share -->
<div class="mt-10 border-slate-300 border-t pt-3 flex">
  <div class="mr-5">
    <h3 class="mb-2 font-semibold">
      <a href="../blog">Back to list</a>
    </h3>
  </div>
  <div>
    <!-- todo: icons -->
    <h3 class="mb-2 font-semibold">Share this post</h3>
    <button
      class="mr-3"
      on:click={() => {
        copyLink();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-3 icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
        />
      </svg>
      Copy link
    </button>
    <a
      target="_blank"
      href={'https://bsky.app/intent/compose?text=' +
        encodeURIComponent(`Blog post from UW IDL: "${meta.title}" + ${url}`)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        stroke="currentColor"
        class="size-3 icon"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.697-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948Z"
        ></path>
      </svg>
      Bluesky
    </a>
  </div>
</div>

<!-- next post -->
<div class="mt-10 border-slate-300 border-t pt-3 flex">
  <div class="text-left" style="width: 50%;">
    {#if nextPost}
      <a href={`${base}/blog/${nextPost.meta.web_name}`}>
        <span class="font-semibold">← Next post</span><br />
        {nextPost.meta.title}
      </a>
    {/if}
  </div>
  <div class="text-right" style="width: 50%;">
    {#if prevPost}
      <a href={`${base}/blog/${prevPost.meta.web_name}`}>
        <span class="font-semibold">Previous post →</span><br />
        {prevPost.meta.title}
      </a>
    {/if}
  </div>
</div>

<!-- recent post -->
<div class="mt-10 border-slate-300 border-t pt-3">
  <h3 class="mb-2 font-semibold">Recent Posts</h3>
  {#each recentPosts as rp}
    <PostThumb post={rp} />
  {/each}
</div>

<style>
  :global(h1) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  :global(h2) {
    margin-top: 2rem !important;
  }
  :global(h3) {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  :global(p img),
  :global(iframe) {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
  }
  :global(p img + em),
  :global(.image + p > em),
  :global(iframe + p > em) {
    display: block;
    margin-top: -1.5rem;
    margin-bottom: 2rem;
    font-size: 0.9em;
    color: #787878;
    text-align: center;
  }
  p.date {
    font-size: 0.9rem;
    color: #999999;
    margin-bottom: 1rem;
    margin-top: -0.5rem;
  }
  p.related-paper {
    font-size: 0.9rem;
    color: #545454;
    margin-bottom: 1rem;
    margin-top: -0.5rem;
  }

  :global(ul) {
    list-style: disc;
    margin-left: 2rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
  :global(ul li) {
    margin-bottom: 0.25rem;
  }

  :global(ol) {
    list-style: decimal;
    margin-left: 2rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
  :global(ol li) {
    margin-bottom: 0.25rem;
  }

  :global(p.display) {
    text-align: left;
    font-size: 1.5rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    font-weight: lighter;
    background-color: #fafafa;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-left: -1rem;
    margin-right: -1rem;
  }

  :global(blockquote) {
    padding-left: 0.5rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
    border-left: 3px solid #ddd;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  :global(hr) {
    border-color: #aaa;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    width: min(300px, 100vh);
    margin-left: auto;
    margin-right: auto;
  }

  :global(.image.image-flex) {
    display: flex;
    flex-wrap: nowrap;
    column-gap: 0.5rem;
  }
  :global(.image.image-flex > *) {
    flex-grow: 1 !important;
    width: 100%;
  }
  svg.icon {
    display: inline;
    vertical-align: baseline;
  }
  button:hover {
    color: #8a5ed3;
  }
</style>
