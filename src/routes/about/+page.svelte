<script lang="ts">
	import about from './about.md?raw';
	import markdownit from 'markdown-it';
	let md = markdownit({ html: true, linkify: true, typographer: true });
</script>

<div class="about">
	{@html md.render(about)}
</div>
