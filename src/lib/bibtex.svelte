<script lang="ts">
	import type { Paper, Venue } from './app-types';
	import { hostname } from './hostname';
	export let paper: Paper;
	export let venue: Venue;

	function formatBibtex(p: Paper, v: Venue) {
		const venue = v.venueType == 'journal' ? 'journal' : 'booktitle';
		const edits = (p.editors || '').replace('&', 'AND');
		const pages = (p.start_page || '') + (p.end_page ? '--' + p.end_page : '');
		const auths = p.authors.map((a) => `${a.last_name}, ${a.first_name}`).join(' AND ');
		const type =
			v.venueType == 'journal'
				? 'article'
				: v.venueType == 'book'
					? 'incollection'
					: 'inproceedings';

		const fields = [
			attr('title', escape(p.title)),
			attr('author', escape(auths)),
			attr(venue, escape(v.fullName)),
			attr('year', p.year),
			attr('volume', p.volume),
			attr('number', p.issue),
			attr('editor', edits),
			attr('pages', pages),
			attr('publisher', p.publisher),
			attr('location', p.location),
			attr('url', `${hostname}/papers/${p.web_name}`),
			attr('doi', p.doi)
		];

		const id = `${p.year}-${p.web_name}`;
		return `@${type}{${id},\n${fields.filter((x) => x).join(',\n')}\n}`;
	}

	function attr(name: string, value?: string | number | null) {
		return value ? `  ${name} = {${value}}` : '';
	}

	function escape(str: string = '') {
		return str
			.replace('&', '\\&')
			.replace('%', '\\%')
			.replace(/\u00E9/, "\\'{e}")
			.replace(/\u00C7/, '\\c{C}')
			.replace(/\u011F/, '\\u{g}');
	}

	const bibtex = formatBibtex(paper, venue);

	async function copyBibtex() {
		await navigator.clipboard.writeText(bibtex);
		alert('Copied BibTeX citation data to clipboard.');
	}
</script>

<div class="group relative bg-slate-100 p-2">
	<button
		class="absolute top-0.5 right-0.5 p-1 rounded-md text-gray-400 hover:text-gray-600 active:bg-slate-600 active:text-white"
		title="Copy BibTeX citation"
		on:click={copyBibtex}
	>
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			><path
				d="M2 6C2 5.44772 2.44772 5 3 5H10C10.5523 5 11 5.44772 11 6V13C11 13.5523 10.5523 14 10 14H3C2.44772 14 2 13.5523 2 13V6Z M4 2.00004L12 2.00001C13.1046 2 14 2.89544 14 4.00001V12"
			></path></svg
		>
	</button>
	<pre class="font-mono text-xs whitespace-pre-wrap">{bibtex}</pre>
</div>
