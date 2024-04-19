import fs from 'fs/promises';
import peopleRaw from '../static/people.json?raw';
import type { Paper, Person } from '../src/lib/app-types';

async function generateIndex() {
	const people = JSON.parse(peopleRaw) as Person[];
	const authorUrls = Object.fromEntries(
		people
			.filter((person) => (person?.url || '').length)
			.map((person) => [`${person.first_name} ${person.last_name}`, person.url])
	);
	const paperList = await fs.readdir('./static/papers', (err, files) => {
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}
		return files;
	});

	const papers = [] as Paper[];
	for (const paper of paperList) {
		const paperRaw = await fs
			.readFile(`./static/papers/${paper}`)
			.then((x) => JSON.parse(x) as Paper);
		const updatedAuthors = paperRaw.authors.map((author) => {
			return {
				...author,
				url: authorUrls[`${author.first_name} ${author.last_name}`]
			};
		});
		const updatedPaper = {
			...paperRaw,
			authors: updatedAuthors
		};
		if (updatedPaper.visible) {
			papers.push(updatedPaper);
		}
		await fs.writeFile(`./static/papers/${paper}`, JSON.stringify(updatedPaper, null, 2));
	}
	await fs.writeFile('./static/papers-index.json', JSON.stringify(papers, null, 2));
}

async function main() {
	await generateIndex();
}
main();
