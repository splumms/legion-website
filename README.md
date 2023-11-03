## Website for the Canadian Legion - Branch 74 Wolfville

### Overview

- This repo represents a static site which requires compilation, but can then be served as a static resource
- This site can be hosted on any resource supporting static files, but may include some services that require a serverless node
- The site itself is served statically, but internal navigation is virtualized in the browser: in other words, the site acts as an SPA when browsed on the client
- While a static site, this app can be extended at any time to a full application by changing the `target` in settings


### Stack

- Requires nodeJS and has been tested on node 16
- Uses a Vue framework, [nuxtJS 2](https://nuxtjs.org/), deployed in static mode
- Styles are written in SCSS, and are concatenated and tree-shaken during compile-time


### Build

To build this site:
- Clone this repo
- Make sure Node.js 16 or newer is installed
  - A version 1 lockfile will not be compatible with this site, so npm 7 or higher must be used
- Configure a self-signed certificate for local HTTPS support (see next section)
- Install npm dependencies by running `npm ci`
- Then, either generate the static site, or run it in local development mode:
  - To build the static site
    - Run `npm run generate`
    - A directory `dist` is created, which contains the static site output
  - To run in local development mode, for features like hot reload:
    - Run `npm run dev`
    - The site will be available in real time via a localhost URL


