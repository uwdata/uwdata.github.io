<script lang="ts">
  import { page } from '$app/stores';
  console.log('error');
</script>

{#if $page.error && $page.error.message}
  <h1>{$page.status}: {$page.error.message}</h1>
{/if}
