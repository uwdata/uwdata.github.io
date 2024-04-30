<script lang="ts">
	import type { Person } from '$lib/app-types';
	export let people: Person[];
  export let displayName: (person: Person) => string;
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
