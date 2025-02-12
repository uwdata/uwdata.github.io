<script lang="ts">
  import Markdown from '$lib/markdown.svelte';
  import content from './vis-day.md?raw';
</script>

<svelte:head>
  <title>Northwest Visualization Day</title>
</svelte:head>

<Markdown {content} />
