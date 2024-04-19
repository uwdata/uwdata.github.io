import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageLoad } from './$types';
import type { Paper, Venue } from '../../../lib/app-types';

export const load: PageLoad = async ({ fetch, params }) => {
	const venues = await fetch(`${base}/venues.json`)
		.then((response) => response.json() as Promise<Venue[]>)
		.catch(() => error(404, 'venues not found'));

	const unsortedPapers = await fetch(`${base}/papers-index.json`)
		.then((response) => response.json() as Promise<Paper[]>)
		.catch(() => error(404, 'papers not found'));
	const papers = unsortedPapers
		.filter((x) => x.tags.includes(params.slug))
		.map((x) => {
			const venue = venues.find((venue) => venue.nickname === x.venue);

			return { paper: x, venue };
		});

	return { papers, tag: params.slug };
};
