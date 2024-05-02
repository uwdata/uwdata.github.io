<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { Spotlight } from './app-types';
  export let projects: Spotlight[];

  let currentIndex = 0;
  let timer: any;

  onMount(() => {
    timer = setInterval(
      () => currentIndex = (currentIndex + 1) % projects.length,
      5000
    );
  });
  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="spotlight relative w-full flex h-48">
  {#each projects as project, index (project)}
    {#if index === currentIndex}
      <a href={`papers/${project.paper}`} in:fade={{ duration: 750 }} out:fade={{ duration: 750 }}>
        <img class="halo" src={project.image} alt="Image for {project.title}" />
        <div>{project.title}</div>
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
  bottom: 5%;
  right: 2%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #ccc;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  padding: 4px 6px;
  font-size: 13px;
  font-weight: 500;
}
</style>
