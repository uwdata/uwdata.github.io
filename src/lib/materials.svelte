<script lang="ts">
  import { base } from '$app/paths';
  import type { Paper } from './app-types';
  export let paper: Paper;

  const links = paper.materials.map((material) => {
    const link = material.link.trim();
    const href = link.startsWith('http') ? link : `${base}/${link}`;
    return { href, label: material.name };
  });
</script>

<a href={`${paper.pdf}`}>PDF</a>
{#each links as link}
  <span></span> | <a href={link.href}>{link.label}</a>
{/each}
{#if paper.note}
  | <span class="font-medium">{paper.note}</span>
{/if}
