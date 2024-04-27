<script lang="ts">
	import type { Paper, Venue } from '../lib/app-types';
	import { base } from '$app/paths';
	import AuthorList from './author-list.svelte';
	import Materials from './materials.svelte';
	export let paper: Paper;
	export let venue: Venue;
</script>

<div class="paper">
	<div class="thumbnail">
		<a class="at" href={`${base}/papers/${paper.web_name}`}>
			<img
				class=""
				src={`${base}/${paper.thumbnail}`}
				alt={`thumb nail image for ${paper.title}`}
			/>
		</a>
	</div>
	<div class="entry">
		<a class="at font-semibold" href={`${base}/papers/${paper.web_name}`}>{paper.title}</a>
		<div class="hidden md:block">
			<AuthorList people={paper.authors} />
			<div class="italic">{venue.fullName}, {paper.year}</div>
			<Materials {paper} />
		</div>
	</div>
</div>
<div class="md:hidden mb-10">
	<AuthorList people={paper.authors} />
	<div>{venue.fullName}, {paper.year}</div>
	<Materials {paper} />
</div>
