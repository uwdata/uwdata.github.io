<script lang="ts">
	import type { Paper } from '../lib/app-types';
	import { base } from '$app/paths';
	export let paper: Paper;

	function prepMaterialLink(material: Paper['materials'][number]) {
		let link = material.link.trim();
		if (link.startsWith('http')) {
			return link;
		} else {
			return `${base}/${link}`;
		}
	}
</script>

<div>
	<a href={`${paper.pdf}`}>PDF</a>
	{#each paper.materials as material}
		<span class="ml-1">|</span>
		<a class="mr-1" href={prepMaterialLink(material)}>{material.name}</a>
	{/each}
	<span class="">|</span>
	<a href={`${base}/bibtex/${paper.web_name}`}>BibTex</a>
	{#if paper.note}
		<span class="">|</span>
		<span class="font-semibold mr-1">{paper.note}</span>
	{/if}
</div>
