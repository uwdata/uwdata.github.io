<script lang="ts">
  import type { Person } from '$lib/app-types';
  import { displayName } from '$lib/display-name';
  import PeopleGrid from './people-grid.svelte';
  import PeopleList from './people-list.svelte';
  export let data: { people: Person[] };

  const groupsByStatus = data.people
    .slice()
    .sort((a: Person, b: Person) => {
      const u = a.last_name,
        v = b.last_name;
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

  const members = [...groupsByStatus['faculty'], ...groupsByStatus['member']];
</script>

<svelte:head>
  <title>UW Interactive Data Lab | People</title>
  <!-- preload people images -->
  {#each members as person}
    <link rel="preload" as="image" href={person.image} />
  {/each}
</svelte:head>

<div class="hidden md:block">
  <PeopleGrid people={members} />
</div>

<div class="md:hidden">
  <div class="lead">members</div>
  {#each members as person}
    <div class="mt-2 w-full flex">
      <a class="block grow-0 shrink-0" href={person.url}>
        <img src={person.image} alt={`head shot of ${displayName(person)}`} />
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
<PeopleList people={groupsByStatus['alumni']} />

<div class="lead mt-6">collaborators</div>
<PeopleList people={groupsByStatus['collaborator']} />
