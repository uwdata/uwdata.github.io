<script lang="ts">
	import type { Paper, Venue } from '../../../lib/app-types';
	import { base } from '$app/paths';
	export let data: { paper: Paper; venue: Venue };
	$: paper = data.paper;
	$: venue = data.venue;

	var HOST_URL = 'http://idl.cs.washington.edu/';
	function bibtex(p: Paper, v: Venue) {
		// const v = app.data.venues[p.venue_id];
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
			bibtex_attr('title', bibtex_escape(p.title)),
			bibtex_attr('author', bibtex_escape(auths)),
			bibtex_attr(venue, bibtex_escape(v.fullName)),
			bibtex_attr('year', p.year),
			bibtex_attr('volume', p.volume),
			bibtex_attr('number', p.issue),
			bibtex_attr('editor', edits),
			bibtex_attr('pages', pages),
			bibtex_attr('publisher', p.publisher),
			bibtex_attr('location', p.location),
			bibtex_attr('url', HOST_URL + 'papers/' + p.web_name)
		].filter((x) => x);
		return `@${type}{${p.year}-${p.web_name},
${fields.join(',\n')}
}`;
	}
	const bibtex_attr = (name: string, value?: string | number | null) =>
		value ? ` ${name} = {${value}}` : '';

	function bibtex_escape(str: string) {
		return !str
			? ''
			: str
					.replace('&', '\\&')
					.replace('%', '\\%')
					.replace(/\u00E9/, "\\'{e}")
					.replace(/\u00C7/, '\\c{C}')
					.replace(/\u011F/, '\\u{g}');
	}
</script>

<div class="pub">
	<a class="title" href={`${base}/papers/${paper.web_name}`}>{paper.title}</a>
	<pre class="bibtex">{bibtex(paper, venue)}</pre>
</div>
