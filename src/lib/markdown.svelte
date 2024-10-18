<script lang="ts">
	import markdownit from 'markdown-it';
	export let content: string;
	export let className: string = 'markdown';
	const md = markdownit({ html: true, linkify: true, typographer: true });
</script>

<div class={className}>
	{@html md.render(content)}
</div>
