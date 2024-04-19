<script lang="ts">
	import about from './about.md?raw';
	import snarkdown from 'snarkdown';
</script>

<div class="about">
	{@html snarkdown(about)}
</div>
