![Discord](https://img.shields.io/discord/410194658501591056)
![npm audit](https://github.com/moonblades/mordor/workflows/audit/badge.svg)
![Jest tests](https://github.com/moonblades/mordor/workflows/jest/badge.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# mordor
Backend server for Gondor.

## Setup
To setup the project run:
```
npm install
```

## Compile TS
To compile the code:
```js
npm run build // compile once
```
or
```js
npm run watch // watch files and recompile whenever they change
```
The compiled js code can be found in `dist/bundle.js`.

### Run the server
To run the server:
```js
npm run node // run the server
```
or
```js
npm run nodemon // watch files and restart the server whenver they change
```

### Documentation
To generate the documentation:
```js
npm run docs
```

---

## Environment variables
An `.env` file can be used to specify environment variables.
See [sample file](./.env.sample).


> **Please note**: the configured database must exist.

---

## Conventions and guidelines

### Versioning
https://semver.org/

### Commits
https://www.conventionalcommits.org/
