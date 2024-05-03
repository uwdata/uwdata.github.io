<script lang="ts">
	import type { Person } from '$lib/app-types';
  import { displayName } from '$lib/display-name';
	export let people: Person[];

  let hoveredPerson: Person | null = null;
	function handleHover(person: Person | null) {
		hoveredPerson = person;
	}
</script>

<div class="grid grid-cols-6 w-full">
  <div class="row-start-2 col-start-1 col-end-3 p-1 pr-2">
		{#if hoveredPerson}
			<div class="text-xl font-semibold mt-6">
				{displayName(hoveredPerson)}
			</div>
			<div class="italic">{hoveredPerson.position}, {hoveredPerson.org}</div>
			<div class="text-sm">{hoveredPerson.interests}</div>
		{:else}
			<img src="images/logo/idl-290.png" alt="IDL logo" />
		{/if}
	</div>
	{#each people as person}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="relative p-1 min-h-36"
      on:mouseenter={() => handleHover(person)}
      on:mouseleave={() => handleHover(null)}
    >
      <a href={person.url}>
        <div
          class="absolute left-3 bottom-2 text-lg font-medium text-white z-10 pointer-events-none"
          style="text-shadow: 1px 1px 3px #000;"
        >
          {person.nickname}
        </div>
        <img
          class="rounded-lg opacity-70 hover:opacity-95"
          src={person.image}
          alt={`headshot of ${displayName(person)}`}
        />
      </a>
    </div>
	{/each}
</div>

