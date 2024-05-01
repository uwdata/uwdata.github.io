<script lang="ts">
	import type { Paper, Venue } from '$lib/app-types';
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

	{#if paper.figure}
		<figure class="mt-5">
			<img
				src={`../${paper.figure}`}
				alt={`Figure for ${paper.title}`}
			/>
			<figcaption class="mt-2 text-xs leading-4">
				{paper.caption}
			</figcaption>
		</figure>
	{/if}

	<div>
		<div class="heading mt-6 mb-2 text-xs">Materials</div>
		<Materials {paper} />
	</div>

	<div class="abstract">
		<div class="heading mt-6 mb-2 text-xs">Abstract</div>
		<div class="text-[15px]">{paper.abstract}</div>
	</div>

	<div>
		<div class="heading mt-6 mb-2 text-xs">BibTeX</div>
		<Bibtex {paper} {venue} />
	</div>
</div>
