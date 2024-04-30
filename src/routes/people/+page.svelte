<script lang="ts">
	import type { Person } from '$lib/app-types';
	import PeopleGrid from './people-grid.svelte';
	import PeopleList from './people-list.svelte';
	export let data: { people: Person[] };

	const groupsByStatus = data.people.slice()
		.sort((a : Person, b : Person) => {
			const u = a.last_name, v = b.last_name;
			return u < v ? -1 : u > v ? 1 : 0;
		})
		.reduce(
			(acc, person) => {
				if (person.visible) {
					if (!acc[person.status]) {
						acc[person.status] = [];
					}
					acc[person.status].push(person);
				}
				return acc;
			},
			{} as Record<Person['status'], Person[]>
		);

	const members = [
		...groupsByStatus['faculty'],
		...groupsByStatus['member']
	];

	function displayName(person: Person) {
		return person.display_name || `${person.first_name} ${person.last_name}`;
	}
</script>

<div class="hidden md:block mt-0.5">
	<PeopleGrid people={members} {displayName} />
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

<div class="lead mt-6">alumni</div>
<PeopleList people={groupsByStatus['alumni']} {displayName} />

<div class="lead mt-6">collaborators</div>
<PeopleList people={groupsByStatus['collaborator']} {displayName} />
