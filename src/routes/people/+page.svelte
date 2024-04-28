<script lang="ts">
	import type { Person } from '$lib/app-types';
	import ActiveMember from './active-member.svelte';

	export let data: { people: Person[] };

	const sortPeople = (a : Person, b : Person) => {
		const u = a.last_name, v = b.last_name;
		return u < v ? -1 : u > v ? 1 : 0;
	};

	let hoveredPerson: Person | null = null;
	const groupsByStatus = data.people.slice()
		.sort(sortPeople)
		.reduce(
			(acc, person) => {
				if (!acc[person.status]) {
					acc[person.status] = [];
				}
				acc[person.status].push(person);
				return acc;
			},
			{} as Record<Person['status'], Person[]>
		);

	const members = [
		...groupsByStatus['faculty'],
		...groupsByStatus['member']
	];

	function handleHover(person: Person | null) {
		hoveredPerson = person;
	}

	function displayName(person: Person) {
		return person.display_name || `${person.first_name} ${person.last_name}`;
	}
</script>

<div class="members hidden md:block">
	{#each members.slice(0, 6) as person}
		<ActiveMember {person} hoverPerson={handleHover} />
	{/each}
	<div class="idlgroup flex items-center justify-center">
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
	{#each members.slice(6) as person}
		<ActiveMember {person} hoverPerson={handleHover} />
	{/each}
</div>

<div class="md:hidden">
	<div class="lead">members</div>
	{#each members as person}
		<div class="mt-2 w-full flex">
			<a class="block w-1/3 grow-0 shrink-0" href={person.url}>
				<img
					src={person.image}
					alt={`head shot of ${displayName(person)}`}
				/>
			</a>
			<div class="ml-2">
				<div class="font-semibold">
					<a class="at" href={person.url}>{displayName(person)}</a>
				</div>
				<div class="italic">{person.position}, {person.org}</div>
				<div class="text-sm">{person.interests}</div>
			</div>
		</div>
	{/each}
</div>

<div class="lead mt-8">alumni</div>
<div class="grid grid-cols-2 md:grid-cols-3 text-sm md:text-base text-left">
	{#each groupsByStatus['alumni'] as person}
		{#if person.url}
			<a href={person.url}>{displayName(person)}</a>
		{:else}
			<div>{displayName(person)}</div>
		{/if}
	{/each}
</div>

<div class="lead mt-8">collaborators</div>
<div class="grid grid-cols-2 md:grid-cols-3 text-sm md:text-base text-left">
	{#each groupsByStatus['collaborator'] as person}
		{#if person.url}
			<a href={person.url}>{displayName(person)}</a>
		{:else}
			<div>{displayName(person)}</div>
		{/if}
	{/each}
</div>
