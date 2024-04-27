<script lang="ts">
	import type { Person } from '$lib/app-types';
	export let data: { people: Person[] };
	import ActiveMember from './active-member.svelte';

	let hoveredPerson: Person | null = null;
	const groupsByStatus = data.people.reduce(
		(acc, person) => {
			if (!acc[person.status]) {
				acc[person.status] = [];
			}
			acc[person.status].push(person);
			return acc;
		},
		{} as Record<Person['status'], Person[]>
	);

	function handleHover(person: Person | null) {
		hoveredPerson = person;
	}
</script>

<div class="members hidden md:block">
	{#each groupsByStatus['lab-lead'] as person}
		<ActiveMember {person} hoverPerson={handleHover} />
	{/each}
	{#each groupsByStatus['current-student'].slice(0, 4) as person}
		<ActiveMember {person} hoverPerson={handleHover} />
	{/each}
	<div class="group flex items-center justify-center">
		{#if hoveredPerson}
			<div class="text-xl font-semibold">
				{hoveredPerson.first_name}
				{hoveredPerson.last_name}
			</div>
			<div class="italic">{hoveredPerson.position}, {hoveredPerson.org}</div>
			<div class="text-sm">
				{hoveredPerson.interests}
			</div>
		{:else}
			<img src="images/logo/idl-290.png" alt="IDL logo" />
		{/if}
	</div>
	{#each groupsByStatus['current-student'].slice(4) as person}
		<ActiveMember {person} hoverPerson={handleHover} />
	{/each}
</div>

<div class="visible md:hidden">
	<div class="lead">current members</div>
	{#each [...groupsByStatus['lab-lead'], ...groupsByStatus['current-student']] as person}
		<div class="mt-8 w-full flex flex-col items-center">
			<img
				class="w-1/2"
				src={person.image}
				alt={`head shot of ${person.first_name} ${person.last_name}`}
			/>
			<div class="text-xl font-semibold">{person.first_name} {person.last_name}</div>
			<div class="italic">{person.position}, {person.org}</div>
			<div class="text-sm text-center">
				{person.interests}
			</div>
		</div>
	{/each}
</div>

<div class="lead mt-8">alumni</div>
<div class="grid md:grid-cols-3 text-left">
	{#each groupsByStatus['alumni'] as person}
		{#if person.url}
			<a href={person.url}>{person.first_name} {person.last_name}</a>
		{:else}
			<div>{person.first_name} {person.last_name}</div>
		{/if}
	{/each}
</div>

<div class="lead mt-8">collaborators</div>
<div class="grid md:grid-cols-3 text-left">
	{#each groupsByStatus['collaborator'] as person}
		{#if person.url}
			<a href={person.url}>{person.first_name} {person.last_name}</a>
		{:else}
			<div>{person.first_name} {person.last_name}</div>
		{/if}
	{/each}
</div>
