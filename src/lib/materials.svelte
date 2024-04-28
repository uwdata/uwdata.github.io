<script lang="ts">
	import type { Paper } from '../lib/app-types';
	import { base } from '$app/paths';
	export let paper: Paper;

	const links = paper.materials.map(material => {
		const link = material.link.trim();
		const href = link.startsWith('http') ? link : `${base}/${link}`;
		return { href, label: material.name };
	});
</script>

<div>
	<a href={`${paper.pdf}`}>PDF</a>
	{#each links as link}
		<span></span> | <a href={link.href}>{link.label}</a>
	{/each}
	{#if paper.note}
		| <span class="font-medium">{paper.note}</span>
	{/if}
</div>
