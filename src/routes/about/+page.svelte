<script lang="ts">
	import Markdown from '$lib/markdown.svelte';
	import content from './about.md?raw';
</script>

<Markdown {content} />
