<script lang="ts">
	import type { Paper, Venue } from './app-types';
	export let paper: Paper;
	export let venue: Venue;

	const HOST_URL = 'https://uwdata.github.io/';

	function formatBibtex(p: Paper, v: Venue) {
		const venue = v.venueType == 'journal' ? 'journal' : 'booktitle';
		const edits = (p.editors || '').replace('&', 'AND');
		const pages = (p.start_page || '') + (p.end_page ? '--' + p.end_page : '');
		const auths = p.authors.map((a) => `${a.last_name}, ${a.first_name}`).join(' AND ');
		const type = v.venueType == 'journal' ? 'article'
      : v.venueType == 'book' ? 'incollection'
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
			attr('url', `${HOST_URL}/papers/${p.web_name}`),
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
  <button class="absolute invisible group-hover:visible top-2 right-2 text-xs bg-gray-50 p-1 border rounded-md hover:bg-white active:bg-slate-600 active:text-white" on:click={copyBibtex}>Copy</button>
  <pre class="font-mono text-xs whitespace-pre-wrap">{bibtex}</pre>
</div>
