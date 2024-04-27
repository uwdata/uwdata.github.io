<script lang="ts">
	import type { SmallPerson } from '../lib/app-types';
	export let people: SmallPerson[];
</script>

<div>
	{#each people as author, i}
		{#if author.url}
			<a href={author.url}>{`${author.first_name} ${author.last_name}`}</a>{i <
			people.length - 1
				? ', '
				: ''}
		{:else}
			{`${author.first_name} ${author.last_name}${i < people.length - 1 ? ', ' : ''}`}
		{/if}
	{/each}
</div>
