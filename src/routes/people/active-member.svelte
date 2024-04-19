<script lang="ts">
	import type { Person } from '$lib/app-types';
	export let person: Person;
	export let hoverPerson: (person: Person | null) => void;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="person"
	on:mouseenter={() => hoverPerson(person)}
	on:mouseleave={() => hoverPerson(null)}
>
	<a class="at" href={person.url}>
		<div class="nickname">
			{person.first_name}
		</div>
		<img
			class="px-2"
			src={person.image}
			alt={`headshot of ${person.first_name} ${person.last_name}`}
		/>
	</a>
</div>
