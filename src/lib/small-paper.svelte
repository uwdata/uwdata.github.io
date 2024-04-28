<script lang="ts">
	import type { Paper, Venue } from '../lib/app-types';
	import { base } from '$app/paths';
	import AuthorList from './author-list.svelte';
	import Materials from './materials.svelte';
	export let paper: Paper;
	export let venue: Venue;
</script>

<div class="flex paper text-md mb-6">
	<div class="thumbnail mt-1 grow-0 shrink-0">
		<a href={`${base}/papers/${paper.web_name}`}>
			<img
			  class="halo rounded-lg"
				src={`${base}/${paper.thumbnail}`}
				alt={`thumbnail image for ${paper.title}`}
			/>
		</a>
	</div>
	<div class="ml-5 leading-tight">
		<a class="font-semibold" href={`${base}/papers/${paper.web_name}`}>{paper.title}</a>
		<div class="hidden md:block">
			<AuthorList people={paper.authors} />
			<div class="italic">{venue.fullName}, {paper.year}</div>
			<Materials {paper} />
		</div>
	</div>
</div>
<div class="md:hidden mb-10">
	<AuthorList people={paper.authors} />
	<div class="italic">{venue.fullName}, {paper.year}</div>
	<Materials {paper} />
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
