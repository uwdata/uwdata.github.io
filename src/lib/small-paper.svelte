<script lang="ts">
	import { base } from '$app/paths';
	import type { Paper, Venue } from './app-types';
	import AuthorList from './author-list.svelte';
	import Materials from './materials.svelte';
	export let paper: Paper;
	export let venue: Venue;
</script>

<div class="md:flex paper text-md mb-6">
	<div class="thumbnail mb-2 md:mt-1 grow-0 shrink-0">
		<a href={`${base}/papers/${paper.web_name}`}>
			<img
			  class="halo rounded-lg"
				src={`${base}/${paper.thumbnail}`}
				alt={`thumbnail image for ${paper.title}`}
			/>
		</a>
	</div>
	<div class="md:ml-5 leading-tight">
		<div class="hidden md:block">
			<a class="font-semibold" href={`${base}/papers/${paper.web_name}`}>{paper.title}</a>
			<div><AuthorList people={paper.authors} /></div>
			<div class="italic">{venue.fullName}, {paper.year}</div>
			<div class="mt-1"><Materials {paper} /></div>
		</div>
		<div class="md:hidden text-sm leading-tight">
			<a class="font-semibold" href={`${base}/papers/${paper.web_name}`}>{paper.title}</a>.
			<AuthorList people={paper.authors} />.
			<span class="italic">{venue.fullName}, {paper.year}</span>
			<div class="mt-1"><Materials {paper} /></div>
		</div>
	</div>
</div>

<style>
.paper {
    font-size: 15px;
}

.paper .thumbnail img {
    width: 120px;
    height: 62px;
}
</style>
