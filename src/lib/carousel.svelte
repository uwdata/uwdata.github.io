<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Spotlight } from '../lib/app-types';
	export let projects: Spotlight[];

	let currentSpotlightIndex = 0;
	function next() {
		currentSpotlightIndex = (currentSpotlightIndex + 1) % projects.length;
	}
	$: projectName = projects[currentSpotlightIndex].title;
  $: projectLink = `papers/${projects[currentSpotlightIndex].paper}`;

	let timer: any;
	const timeout = 5000;
	onMount(() => {
		timer = setInterval(next, timeout);
	});
	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<div class="spotlight relative w-full hidden md:flex h-52">
  {#each projects as image, index (image)}
    {#if index === currentSpotlightIndex}
      <a href={projectLink} in:fade={{ duration: 1000 }} out:fade={{ duration: 1000 }}>
        <img class="halo" src={image.image} alt="Image for {projectName}" />
        <div>{projectName}</div>
      </a>
    {/if}
  {/each}
</div>

<style>
.spotlight a {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    color: #000;
}

.spotlight div {
    position: absolute;
    bottom: 15px;
    right: 35px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #ccc;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    padding: 4px 6px;
    text-align: right;
    font-size: 14px;
    font-weight: 500;
}
</style>
