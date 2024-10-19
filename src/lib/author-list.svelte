<script lang="ts">
  import type { SmallPerson } from './app-types';
  import { displayName } from './display-name';
  export let people: SmallPerson[];
</script>

{#each people as author, i}
  {#if author.url}
    <a href={author.url}>{displayName(author)}</a>{i < people.length - 1 ? ', ' : ''}
  {:else}
    {`${displayName(author)}${i < people.length - 1 ? ', ' : ''}`}
  {/if}
{/each}
