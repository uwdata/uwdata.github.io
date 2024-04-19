<script lang="ts">
	import type { Paper, Venue } from '$lib/app-types';
	import SmallPaper from '$lib/small-paper.svelte';
	type Pair = { paper: Paper; venue: Venue };
	export let data: { papers: Pair[]; tag: string };
</script>

<div>
	<div class="lead">{data.tag}</div>
	{#each data.papers.sort((a, b) => b.paper.year - a.paper.year) as { paper, venue }}
		<SmallPaper {paper} {venue} />
	{/each}
</div>
