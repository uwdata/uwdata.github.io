# Interactive Data Lab Website

This repository contains the source code and supporting files for the IDL website.

The website is developed in [SvelteKit](https://kit.svelte.dev/). The data backing the application can be found in the `static` folder, and edited through the various JSON files there.

### Running The Website Locally

After cloning, run the following standard web development commands:

```sh
yarn       # install the dependencies
yarn test  # prepare and check needed files
yarn dev   # start the dev server
```

This will start up a dev server, most likely on http://localhost:5173/. Navigate there and you'll have nice auto reload on save. If your changes are not being updated (such as to your recently added paper) you may need to run `yarn test` to trigger some of the integrity checkers.

### Build Process

To build the web site locally run:

```sh
yarn build
```

Then to preview the build do:

```sh
yarn preview
```

However! It is unlikely you will need to do a full build of the website locally. Deployed builds are run by GitHub. The right way to trigger them is to open a PR, and the rest should take care of itself.

## FAQ

All of the below how-to's assume that you are doing this via a pull request (PR).

- What's all that stuff that runs when I try to commit?

That's the system running the tests to try to prevent you from breaking the build. If you've done everything right then don't worry! Otherwise you'll get some hints on what to fix.

- How do I add a new paper?

Go to `static/papers/` and add a new paper. One way to start is by copying a previous file. Or, you can use the [`prepare-paper` app](https://idl.uw.edu/prepare-paper/) to fill out a form, download a JSON data file for your publication, and edit it as nedded. If your paper already has an assigned [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier), the prepare app can even load paper metadata for you!

The `web_name` of your paper *must* match the file name for the paper JSON: if your web name is "reactive-vega" you should make a file called `static/papers/reactive-vega.json`. The `web_name` attribute must be unique across all papers.

If there are authors who are not yet included in `static/people.json`, you will need to add them to that file. Make sure you get everyone's name right! The `first_name` and `last_name` fields in the paper JSON data must exactly match the corresponding fields in the `people.json` dataset.  When adding authors to a paper's JSON file, you should not include `url` or `display_name` fields, as these are copied from `people.json` automatically. Note that you'll also get a warning from the test suite if you have not added people correctly.

Speaking of: make sure to run the tests! If you are adding via a pull request (which is absolutely what you should be doing!), then the tests will run automatically on your GitHub branch. Meanwhile, tests will be run for you locally before you are able to commit. You can also run them your self via `yarn test`.

Finally, make sure to include your images. You'll need to provide up to two: a thumbnail (requried) and a figure image (optional, but highly recommended). The thumbnail should be placed in the `static/images/thumbs` folder and the figure in the `static/images/figures` folder. Thumbnail images should be 240 pixels wide x 124 pixels tall &ndash; while technically we size thumbnails as 120x62, using 240x124 will result in non-blurry high-res images on retina displays with double pixel density. Figure images should use a sufficient resolution to display nicely on retina displays, up to 1520px wide at full width.

- How do I add myself to the lab?

Go to `static/people.json` and add yourself to the bottom. Add an image of yourself in `static/images/people`. Ensure that your image is 140x200 pixels.

- How do I add some new news?

Go to `static/news.json` and add the new news to the bottom! You can use markdown formatting in news items.

- How do I change the venues listed on the front page?

Go to `featured-venues.json` and add to the bottom. Make sure that you are using an already existing venue nick name, otherwise you'll need to add it to `static/venues.json`.

- How do I deploy new changes?

Create a new branch (`git checkout -b my-branch-name`), commit as normal, then push your branch and open a PR. When your change lands on `main` it will be deployed to the web automatically.
