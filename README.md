hellotypescript
---------------

Presentation about the basics of Typescript, using [reveal.js](http://lab.hakim.se/reveal-js/#/).

First presented at [Santa Cruz JavaScript Meetup](https://www.meetup.com/santacruzjs/) on
[August 24th, 2017](https://www.meetup.com/santacruzjs/events/242048106/).

Using a custom [React](https://facebook.github.io/react/) component and
[TypeScript](https://www.typescriptlang.org/) itself to drive the presentation, which is stored in
the file `res/presentation.hjson` in [HJSON](https://hjson.org/) format.

Requires [NodeJS](https://nodejs.org/), version 8.4 or higher.

To build:

```
npm install
npm run clean
npm run build
npm run webpack
```

Start it:

```
npm run devserver
```

Show it:

Then open a browser on the same machine and go to [http://localhost:9000](http://localhost:9000).
