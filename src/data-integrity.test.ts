import { expect, test } from 'vitest';
import type { Paper, Person, Spotlight, FeaturedVenue, News, Venue, Course } from './lib/app-types';

import papersIndexRaw from '../static/papers-index.json?raw';
import peopleRaw from '../static/people.json?raw';
import spotlightRaw from '../static/spotlight.json?raw';
import featuredVenuesRaw from '../static/featured-venues.json?raw';
import venuesRaw from '../static/venues.json?raw';
import newsRaw from '../static/news.json?raw';
import courseRaw from '../static/courses.json?raw';

import tsj from 'ts-json-schema-generator';
import Ajv from 'ajv';

const papers = JSON.parse(papersIndexRaw) as Paper[];

const people = JSON.parse(peopleRaw) as Person[];
const spotlight = JSON.parse(spotlightRaw) as Paper[];
const featuredVenues = JSON.parse(featuredVenuesRaw) as FeaturedVenue[];
const venues = JSON.parse(venuesRaw) as Venue[];
const news = JSON.parse(newsRaw) as Paper[];
const courses = JSON.parse(courseRaw) as Course[];

test('Web names should be unique', () => {
  const webNames = new Set(papers.map((paper) => paper.web_name));
  expect(webNames.size).toBe(papers.length);
});

test('All papers should have corresponding venues', () => {
  const venuesSet = new Set(papers.map((paper) => paper.venue));
  const venues = featuredVenues.map((venue) => venue.venue_nickname);
  const missingVenues = venues.filter((venue) => !venuesSet.has(venue));
  expect(missingVenues).toEqual([]);
});

test('All venue nicknames should be unique', () => {
  const venueNicknames = new Set(venues.map((venue) => venue.nickname));
  expect(venueNicknames.size).toBe(venues.length);
});

test('All papers should have corresponding people', () => {
  const peopleSet = new Set(people.map((person) => `${person.first_name} ${person.last_name}`));
  const paperAuthors = papers
    .flatMap((paper) => paper.authors.map((author) => `${author.first_name} ${author.last_name}`))
    .filter((author) => !peopleSet.has(author));
  expect(paperAuthors).toEqual([]);
});

test('All papers should have urls for their authors if possible', () => {
  const authorUrls = Object.fromEntries(
    people
      .filter((person) => (person?.url || '').length)
      .map((person) => [`${person.first_name} ${person.last_name}`, person.url])
  );
  const updatedPapers = papers.map((paper) => {
    const authors = paper.authors.map((author) => {
      return {
        ...author,
        url: authorUrls[`${author.first_name} ${author.last_name}`]
      };
    });
    return {
      ...paper,
      authors
    };
  });
  expect(updatedPapers).toEqual(papers);
});

[
  { key: 'Paper', dataset: papers, accessor: (paper: Paper): string => paper.web_name },
  {
    key: 'Person',
    dataset: people,
    accessor: (person: Person): string => `${person.first_name} ${person.last_name}`
  },
  {
    key: 'Spotlight',
    dataset: spotlight,
    accessor: (spotlight: Spotlight): string => spotlight.title
  },
  {
    key: 'FeaturedVenue',
    dataset: featuredVenues,
    accessor: (venue: FeaturedVenue): string => venue.desc
  },
  {
    key: 'News',
    dataset: news,
    accessor: (x: News): string => x.text
  },
  {
    key: 'Venue',
    dataset: venues,
    accessor: (venue: Venue): string => venue.nickname
  },
  {
    key: 'Course',
    dataset: courses as Course[],
    accessor: (course: Course): string => course.name
  }
].forEach(({ key, dataset, accessor }) => {
  test(`All ${key} values should be filled out`, () => {
    const ajv = new Ajv({ allErrors: true });

    const config = {
      path: 'src/lib/app-types.ts',
      tsconfig: 'tsconfig.json',
      type: key,
      additionalProperties: false
    };

    const schema = tsj.createGenerator(config).createSchema(config.type);

    dataset.forEach((unit) => {
      const result = ajv.validate(schema, unit);
      if (!result) {
        console.log(ajv.errors);
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const unitName = accessor(unit);
      expect(result, `${key}: "${unitName}" is invalid`).toBe(true);
    });
  });
});
