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
```properties
# Development settings
DB_HOST_DEVELOP=127.0.0.1
DB_PORT_DEVELOP=3306
DB_NAME_DEVELOP="foo_develop"
DB_USER_DEVELOP="user"
DB_PASSWORD_DEVELOP="pass"

# Test settings
DB_HOST_TEST=127.0.0.1
DB_PORT_TEST=3306
DB_NAME_TEST="foo_test"
DB_USER_TEST="user"
DB_PASSWORD_TEST="pass"

# Production settings
DB_HOST_PROD=127.0.0.1
DB_PORT_PROD=3306
DB_NAME_PROD="foo_prod"
DB_USER_PROD="user"
DB_PASSWORD_PROD="pass"

# Sever port (on this machine)
SERVER_PORT=3000

# Choose <development|test|production>
SERVER_ENVIRONMENT="development"
NODE_ENV="development"
```

> **Please note**: the configured database must exist.

---

## Conventions and guidelines

### Versioning
https://semver.org/

### Commits
https://www.conventionalcommits.org/
