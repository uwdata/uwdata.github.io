<script lang="ts">
	import type { Person } from '$lib/app-types';
  import { displayName } from '$lib/display-name';
	export let people: Person[];
</script>

<div class="grid grid-cols-2 md:grid-cols-3 text-sm md:text-base text-left">
	{#each people as person}
		{#if person.url}
			<a href={person.url}>{displayName(person)}</a>
		{:else}
			<div>{displayName(person)}</div>
		{/if}
	{/each}
</div>
