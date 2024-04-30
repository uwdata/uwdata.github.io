<script lang="ts">
	import { base } from '$app/paths';
	import markdownit from 'markdown-it';
	import type { Paper, News, Spotlight, Venue, Course } from '$lib/app-types';
	import SmallPaper from '$lib/small-paper.svelte';
	import Carousel from '$lib/carousel.svelte';

	export let data: {
		groupedPapers: { papers: { paper: Paper; venue: Venue }[]; event: string }[];
		news: News[];
		spotlight: Spotlight[];
		courses: Course[];
	};

	let md = markdownit({ html: true, linkify: true, typographer: true });

	function toDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			timeZone: 'UTC',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="mission md:text-xl mb-4">
	<a href={`${base}/about`}>
		<span class="lead">our mission</span> is to enhance people's ability to
		<strong>understand and communicate data</strong>
		through the design of new <strong>interactive systems</strong> for data visualization and analysis.
	</a>
</div>

<Carousel projects={data.spotlight} />

<div class="mt-4 md:flex">
	<div class="flex flex-col pr-10 basis-9/12 pt-3 border-t md:pt-0 md:border-t-0">
		<div class="lead">
			Recent Publications
			<a class="ml-2 text-sm font-thin tracking-normal hidden md:inline-block" href={`${base}/papers`}>(VIEW ALL PAPERS)</a>
		</div>
		{#each data.groupedPapers as group}
			<div class="flex flex-col">
				<div class="text-sm font-medium mb-3">{group.event}</div>
				{#each group.papers as x}
					<SmallPaper paper={x.paper} venue={x.venue} />
				{/each}
			</div>
		{/each}
	</div>

	<div class="flex-col basis-3/12 pt-3 border-t md:pt-0 md:border-t-0">
		<section>
			<div class="lead">Updates</div>
			{#each data.news as newsItem}
				<div class="update text-sm mb-3">
					<div class="italic">{toDate(newsItem.date)}</div>
					<div class="news">{@html md.render(newsItem.text)}</div>
				</div>
			{/each}
		</section>

		<section class="hidden md:block">
			<div class="lead">Courses</div>
			<div class="text-sm italic">Graduate</div>
			{#each data.courses.filter((x) => x.level === 'Graduate') as course}
				<div class="text-sm"><a href={course.link}>{course.name}</a></div>
			{/each}
			<div class="text-sm italic mt-4">Undergraduate</div>
			{#each data.courses.filter((x) => x.level === 'Undergraduate') as course}
				<div class="text-sm"><a href={course.link}>{course.name}</a></div>
			{/each}
		</section>
	</div>
</div>
