<script lang="ts">
	import type { Paper, Venue } from '../../lib/app-types';
	import SmallPaper from '../../lib/small-paper.svelte';

	type Pair = { paper: Paper; venue: Venue };
	export let data: { papers: Pair[] };
	$: sectionedPapers = data.papers.reduce(
		(acc, x) => {
			if (!acc[x.paper.year]) {
				acc[x.paper.year] = [];
			}
			acc[x.paper.year].push(x);
			return acc;
		},
		{} as Record<string, Pair[]>
	);
</script>

<svelte:head>
	<title>UW Interactive Data Lab | Papers</title>
</svelte:head>

<div class="md:pr-10">
	{#each Object.keys(sectionedPapers).sort().reverse() as year}
		<div class="heading">{year}</div>
		{#each sectionedPapers[year] as { paper, venue }}
			<SmallPaper {paper} {venue} />
		{/each}
	{/each}
</div>