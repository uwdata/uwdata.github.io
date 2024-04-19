import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Paper, Venue } from '../../../lib/app-types';
import { base } from '$app/paths';

export const load: PageLoad = async ({ params, fetch }) => {
	const venues = await fetch(`${base}/venues.json`).then(
		(response) => response.json() as Promise<Venue[]>
	);
	const content = await fetch(`${base}/papers/${params.slug}.json`)
		.then((response) => response.json() as Promise<Paper>)
		.then((x) => {
			if (x) {
				return { paper: x, venue: venues.find((venue) => venue.nickname === x.venue)! };
			}
			return error(404, 'Bibtex Not found');
		});

	return content;
};
