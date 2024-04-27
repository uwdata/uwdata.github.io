<script lang="ts">
	import type { Paper, Venue } from '../../../lib/app-types';
	import AuthorList from '$lib/author-list.svelte';
	import SmallPaper from '$lib/small-paper.svelte';
	import Materials from '$lib/materials.svelte';
	export let data: { paper: Paper; venue: Venue };
	$: paper = data.paper;
	$: venue = data.venue;
</script>

<div class="pub">
	<h1 class="font-semibold text-lg">{paper.title}</h1>
	<AuthorList people={paper.authors} />
	<div class="figure">
		{#if paper.figure}
			<img
				class="w-full md:max-w-3xl"
				src={`../${paper.figure}`}
				alt={`Illustrative figure for ${paper.title}`}
			/>
		{/if}
		<div class="caption">{paper.caption}</div>
	</div>
	<div class="abstract">
		<div class="heading">Abstract</div>
		<div class="text">{paper.abstract}</div>
	</div>

	<div class="heading">Materials</div>
	<Materials {paper} />

	<div class="hidden md:block">
		<div class="heading">Citation</div>
		<SmallPaper {paper} {venue} />
	</div>
</div>
