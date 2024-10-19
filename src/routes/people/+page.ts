import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageLoad } from './$types';
import type { Person } from '../../lib/app-types';

export const load: PageLoad = async ({ fetch }) => {
  const people = await fetch(`${base}/people.json`)
    .then((response) => response.json() as Promise<Person[]>)
    .catch(() => error(404, 'People not found'));
  return { people };
};
