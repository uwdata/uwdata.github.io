import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageLoad } from './$types';
import type { Paper, Venue } from '$lib/app-types';

export const load: PageLoad = async ({ params, fetch }) => {
  const venues = await fetch(`${base}/venues.json`).then(
    (response) => response.json() as Promise<Venue[]>
  );

  // todo add caching around this
  const paper = await fetch(`${base}/papers/${params.slug}.json`)
    .then((response) => response.json() as Promise<Paper>)
    .then((x) => {
      if (x) {
        return { paper: x, venue: venues.find((venue) => venue.nickname === x.venue) };
      }
      return error(404, `Specific Paper (${params.slug}) Not found`);
    })
    .catch((e) => {
      console.log(e);
      return error(500, e.message);
    });

  return paper;
};
