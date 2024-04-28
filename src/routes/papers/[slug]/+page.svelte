<script lang="ts">
	import type { Paper, Venue } from '../../../lib/app-types';
	import AuthorList from '$lib/author-list.svelte';
	import Bibtex from '$lib/bibtex.svelte';
	import Materials from '$lib/materials.svelte';
	export let data: { paper: Paper; venue: Venue };
	$: paper = data.paper;
	$: venue = data.venue;
</script>

<div class="pub">
	<h1 class="font-semibold md:text-lg md:leading-snug leading-snug">{paper.title}</h1>

	<div class="md:hidden text-sm mt-1">
		<AuthorList people={paper.authors} />.
		<span class="italic">{venue.fullName}, {paper.year}
	</div>
	<div class="hidden md:block mt-1">
		<div><AuthorList people={paper.authors} /></div>
		<div class="italic">{venue.fullName}, {paper.year}</div>
	</div>

	<div class="figure">
		{#if paper.figure}
			<img
				class="w-full md:max-w-3xl"
				src={`../${paper.figure}`}
				alt={`Figure for ${paper.title}`}
			/>
		{/if}
		<div class="caption text-xs">{paper.caption}</div>
	</div>

	<div>
		<div class="heading">Materials</div>
		<Materials {paper} />
	</div>

	<div class="abstract">
		<div class="heading">Abstract</div>
		<div class="text">{paper.abstract}</div>
	</div>

	<div>
		<div class="heading">BibTeX</div>
		<Bibtex {paper} {venue} />
	</div>
</div>
