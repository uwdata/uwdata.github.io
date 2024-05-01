# Interactive Data Lab Website

This repository contains the source code and supporting files for the IDL website.

The website is developed in [SvelteKit](https://kit.svelte.dev/). The data backing the application can be found in the `static` folder, and edited through the various JSON files there.

### Running The Website Locally

After cloning, run the following standard web development commands

```sh
# install the dependencies
yarn
# get the basic infra in place
yarn test
# start the dev server
yarn dev
```

This will start up a dev server, most likely on http://localhost:5173/. Navigate there and you'll have nice auto reload on save. If your changes are not being updated (such as to your recently added paper) you may need to run `yarn test` to trigger some of the integrity checkers.

### Build Process

To build the web site locally run

```sh
yarn build
```

Then to preview the build do

```sh
yarn preview
```

However! It is unlikely you will need to do a full build of the website locally. Deployed builds are run by GitHub. The right way to trigger them is to open a PR, and the rest should take care of itself.

## Site refactor

- [ ] Add tags throughout
- [ ] Point old site at new one

## FAQ

All of the below how-to's assume that you are doing this via a pull request (PR).

- What's all that stuff that runs when I try to commit?

That's the system running the tests to try to prevent you from breaking the build. If you've done everything right then don't worry! Otherwise you'll get some hints on what to fix.

- How do I add new paper?

Go to `static/papers/` and add a new paper. One way to start is by copying a previous file. To simplify the process, you can use the [`prepare-paper` app](https://uwdata.github.io/prepare-paper/) to fill out a form, download a JSON data file for your publication, then edit it further as nedded. If your paper already has an assigned [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier), the prepare app can even load some of the paper metadata for you!

The `web_name` of your paper should match the file name for the paper JSON: if your web name is "reactive-vega" you should make a file called `static/papers/reactive-vega.json`. The `web_name` attribute *must* be unique across all papers.

If there are authors who are not yet included in `static/people.json`, you will need to add them to that file. Make sure you get everyone's name exactly right! The `first_name` and `last_name` fields in the paper JSON file must match the corresponding names in the `people.json` dataset.  When adding authors to a paper's JSON file, you do not need to specify `url` or `display_name` fields; these will be copied from `people.json` automatically. Note that you'll also get a warning from the test suite if you have not added people correctly.

Speaking of: make sure to run the tests! If you are adding via a pull request (which is absolutely what you should be doing!), then the tests will run automatically on your github branch. Meanwhile, tests will be run for you locally before you are able to commit. You can also run them your self via `yarn test`.

Finally, make sure to include your images. You'll need to provide two: one figure (like what appears on /papers/divi) and a thumbnail (for what appears on /papers etc). The figure should be placed in the `static/images/figures` folder and the thumbnail in the `static/images/thumbs` folder. Thumbnail images should be 240 pixels wide x 124 pixels tall; while technically we size thumbnails as 120x62, using 240x124 will result in non-blurry, high-res images on common retina displays with double pixel density. Figure images should use a sufficient resolution to display nicely on retina displays, around 1400px wide if full width. See other images for examples of what's normal.

- How do I add myself to the lab?

Go to `static/people.json` and add yourself to the bottom. If you want to include an image of yourself (which you should!), add it in `static/images/people`. Ensure that your image is 140x200 pixels.

- How do I add some new news?

Go to `static/news.json` and add the new news to the bottom! Same story for courses and so on.

- How do I change the venues listed on the front page?

Go to `featured-venues.json` and add to the bottom. Make sure that you are using an already existing venue nick name, otherwise you'll need to add it to `static/venues.json`.

- How do I deploy new changes?

Just commit as normal and open a PR. When your change lands on `main` it'll deploy itself.
