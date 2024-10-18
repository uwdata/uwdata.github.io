<script lang="ts">
	import type { Person } from '$lib/app-types';
	import { displayName } from '$lib/display-name';
	export let people: Person[];
</script>

<div class="columns-2 md:columns-3 text-sm md:text-base text-left">
	{#each people as person}
		{#if person.url}
			<div><a href={person.url}>{displayName(person)}</a></div>
		{:else}
			<div>{displayName(person)}</div>
		{/if}
	{/each}
</div>
