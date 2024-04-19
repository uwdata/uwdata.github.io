import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageLoad } from './papers/$types';
import type { Paper, Spotlight, FeaturedVenue, Venue, Course } from '../lib/app-types';

export const load: PageLoad = async ({ fetch }) => {
	const courses = await fetch(`${base}/courses.json`)
		.then((response) => response.json() as Promise<Course[]>)
		.catch(() => error(404, 'Courses not found'));

	const venues = await fetch(`${base}/venues.json`)
		.then((response) => response.json() as Promise<Venue[]>)
		.catch(() => error(404, 'Index: Venues Index Not found'));
	const papers = await fetch(`${base}/papers-index.json`)
		.then((x) => x.json() as Promise<Paper[]>)
		.then((x) =>
			x.map((paper) => {
				const venue = venues.find((x) => x.nickname === paper.venue)!;
				return { venue, paper };
			})
		);

	const groupedPapers = await fetch(`${base}/featured-venues.json`)
		.then((response) => response.json() as Promise<FeaturedVenue[]>)
		.then((featuredVenues) =>
			featuredVenues
				.filter(({ visible }) => visible)
				.reverse()
				.map((x) => {
					const featureYear = Number(x.year);
					const featureVenue = x.venue_nickname;
					const filteredPapers = papers.filter(({ paper, venue }) => {
						const rightVenue = venue.nickname === featureVenue;
						const paperYear = new Date(paper.pub_date || '').getFullYear();
						const rightYear = paperYear === featureYear;
						return rightVenue && rightYear;
					});
					if (filteredPapers.length === 0) {
						console.log(x.desc, 'has no papers');
					}
					return {
						papers: filteredPapers,
						event: x.desc
					};
				})
		)
		.catch((e) => error(500, e));

	const news = await fetch(`${base}/news.json`)
		.then((response) => response.json() as Promise<Paper[]>)
		.then((x) => x.filter((x) => x.visible).reverse())
		.catch(() => error(404, 'News not found'));

	const spotlight = await fetch(`${base}/spotlight.json`)
		.then((response) => response.json() as Promise<Spotlight[]>)
		.then((x) => x.filter((x) => x.visible))
		.catch(() => error(404, 'Spotlight not found'));

	return { groupedPapers, news, spotlight, courses };
};
