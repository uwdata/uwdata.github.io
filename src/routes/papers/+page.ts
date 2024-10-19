import { base } from '$app/paths';
import type { PageLoad } from './$types';
import type { Paper, Venue } from '../../lib/app-types';

export const load: PageLoad = async ({ fetch }) => {
  const venues = await fetch(`${base}/venues.json`).then(
    (response) => response.json() as Promise<Venue[]>
  );
  const papers = await fetch(`${base}/papers-index.json`)
    .then((x) => x.json() as Promise<Paper[]>)
    .then((x) =>
      x.map((paper) => {
        const venue = venues.find((x) => x.nickname === paper.venue)!;
        return { venue, paper };
      })
    );

  return { papers };
};
