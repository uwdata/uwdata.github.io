import fs from 'fs/promises';
import peopleRaw from '../static/people.json?raw';
import type { Paper, Person } from '../src/lib/app-types';

async function generateIndex() {
	const people = JSON.parse(peopleRaw) as Person[];
	const personMap = Object.fromEntries(people.map((p) => [`${p.first_name} ${p.last_name}`, p]));
	const paperList = await fs.readdir('./static/papers');

	const papers = [] as Paper[];
	for (const paper of paperList) {
		const paperRaw = await fs
			.readFile(`./static/papers/${paper}`, 'utf8')
			.then((x) => JSON.parse(x) as Paper);
		const updatedAuthors = paperRaw.authors.map((author) => {
			const key = `${author.first_name} ${author.last_name}`;
			const { url, display_name } = personMap[key] || {};
			return {
				...author,
				display_name: display_name || undefined,
				url: url || undefined
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
	papers.sort((a, b) => {
		const ad = a.mod_date;
		const bd = b.mod_date;
		const at = a.title;
		const bt = b.title;
		// sort by reverse mod date, break ties by alphabetic title order
		return ad < bd ? 1 : ad > bd ? -1 : at < bt ? -1 : at > bt ? 1 : 0;
	});
	await fs.writeFile('./static/papers-index.json', JSON.stringify(papers, null, 2));
}

async function main() {
	await generateIndex();
}
main();
