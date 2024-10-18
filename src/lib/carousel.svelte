<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Spotlight } from './app-types';
	export let projects: Spotlight[];

	let currentIndex = 0;
	let timer: ReturnType<typeof setInterval>;

	onMount(() => {
		timer = setInterval(() => (currentIndex = (currentIndex + 1) % projects.length), 5000);
	});
	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<div class="relative w-full h-48">
	{#each projects as project, index (project)}
		{#if index === currentIndex}
			<a
				class="block absolute left-0 top-0 w-full h-48"
				href={`papers/${project.paper}`}
				in:fade={{ duration: 750 }}
				out:fade={{ duration: 750 }}
			>
				<img class="halo" src={project.image} alt="Image for {project.title}" />
				<div
					class="absolute bottom-3 right-3 px-1.5 py-1 font-medium text-sm text-black bg-white border border-gray-300 rounded-tr-md rounded-bl-md"
				>
					{project.title}
				</div>
			</a>
		{/if}
	{/each}
</div>
