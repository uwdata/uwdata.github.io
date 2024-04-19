# Interactive Data Lab Website

This repository contains the source code and supporting files for the IDL website. The website is implemented as a single-page JavaScript application. HTML rendering is done client-side using a backing database of site content stored in JSON format.

### Running The Website Locally

After cloning, run the following standard web development commands

```sh
# install the dependencies
yarn
# start the dev server
yarn dev
```

This will start up a dev server, most likely on http://localhost:5173/. Navigate there and you'll have nice auto reload on save. If your changes are not being updated (such as to your recently added paper) you may need to run `yarn test` to trigger some of the integrity checkers.

### Build Process

To build the web application code, run the makefile (`make`) within the top directory. The JavaScript build process depends on supporting node.js modules. First, make sure you have node.js and npm (Node Package Manager) installed and accessible from the command line. Run `make install` to install these modules into a local node_modules folder. The make install command will create the node_modules folder if it does not exist.

### Server Location

The website is hosted by CSE servers (recycle,unicle,tricycle) at `/cse/web/research/idl/`.

See more info at https://github.com/uwdata/idl-resources/wiki/Web-Resources

## Site refactor

- [x] Implement build process
- [x] Describe build process
- [x] Add integrity checks for adding new people / new papers
- [x] Mobile?
- [ ] Dark mode?
- [x] File stuff?
- [ ] "YOU ARE GOING TO DIE" preservation issues
- [ ] Point old site at new one
- [ ] github.io confusion

## FAQ

All of the below how-to's assume that you are doing this via a pull-request.

- How do I add new paper?

Go to static/papers/ and and a new paper. The webname of your paper should match the file name of the paper (eg if your web name is "reactive-vega" you should make a file called "static/papers/reactive-vega.json"). If there are authors who are not yet in the people.json file you should go add them too. Make sure you get everyone's name exactly right! They should match the names in the people table (you'll also get a warning from running the rest suite of you have not added people correct).

You don't need to worry about getting folks websites right, those will get added automatically when you run the tests.

Speaking of: Make sure to run the tests. If you are adding via a pull request (which is preferred) then the tests will run automatically on your github branch. If not the tests will be run for you before you are able to commit.

Finally, make sure to include your images. You'll need to provide two: one figure (like what appears on /papers/divi) and a thumbnail (for what appears on /papers etc). The thumbnail should be 120 pixels wide x 60 pixels tall, while the figure should be a nice big high resolution image. See other images for examples of what's normal.

- How do I add myself to the lab?

Go to static/people.json and add yourself to the bottom. If you want to include an image of yourself (which you should!), add it to static/images. Ensure that your image is 140x200.

- How do I add some new news?

Go to static/news.json and add the new news to the bottom!

- How do I change the venues listed on the front page?

Go to featured-venues.json and add to the bottom. Make sure that you are using an already existing venue nick name, or you'll need to add it to static/venues.json

- How do I deploy new changes?

Just commit as normal and when your change lands on master it'll deploy itself.
