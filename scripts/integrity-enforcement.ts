import fs from 'fs/promises';
import peopleRaw from '../static/people.json?raw';
import type { BlogPost, Paper, Person } from '../src/lib/app-types';
import { parsePostData, stripHTML } from "../src/lib/pasre-post";
import markdownit from 'markdown-it'

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

async function generateBlogList() {
  const postList = await fs.readdir('./static/blog-assets/posts');

  const md = markdownit({ html: true, linkify: true });

  const posts = [] as BlogPost[];
  for (const post of postList) {
    const web_name = post.split(".").slice(0, -1).join(".");
    const postRaw = await fs
      .readFile(`./static/blog-assets/posts/${post}`, 'utf8')
      .then((x) => parsePostData(x, web_name) as BlogPost);
    const rendered_post = md.render(postRaw.post)
    const summary = stripHTML(rendered_post).slice(0, 100)
    const first_image = postRaw.first_image;
    posts.push({ meta: postRaw.meta, post: summary, first_image });
  }
  posts.sort((a, b) => {
    const ad = a.meta.date;
    const bd = b.meta.date;
    const at = a.meta.title;
    const bt = b.meta.title;
    // sort by reverse mod date, break ties by alphabetic title order
    return ad < bd ? 1 : ad > bd ? -1 : at < bt ? -1 : at > bt ? 1 : 0;
  });
  posts.forEach((a, i) => {
    a.meta.recent = (i < 5);
  })
  await fs.writeFile('./static/blog-index.json', JSON.stringify(posts, null, 2));
}

async function main() {
  await generateIndex();
  await generateBlogList()
}

main();
