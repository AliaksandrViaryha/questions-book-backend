<div align="center" >
  <h1>The Question Book.</h1>
</div>

<div align="center">
  <sub>Questions aggregator. Made with <a href="https://nestjs.com/">Nest.js</a> and <a href="https://www.
typescriptlang.org/">TypeScript</a></sub>
</div>

## Table of Contents

  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
           <li>
             <a href="#working-with-migrations">Working with migrations</a>
           </li>
           <li>
             <a href="#running-the-app">Running the app</a>
           </li>
           <li>
             <a href="#test">Testing</a>
           </li>
        </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->

## About The Project

Questions book is an internal non-commercial system.

The main business goal of the Questions book application is to provide aggregating question from previous interview and preparation employees for interview of different levels, to sort questions by popular and achieve passing each interview.

### Built With

- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

## Prerequisites
  - Node.js >= v18.0.0
  - npm >= 8.0.0

## Installation
1. Clone the `questions-book-backend` [repo](https://github.com/AliaksandrViaryha/questions-book-backend)
   ```https
    https://github.com/AliaksandrViaryha/questions-book-backend.git
   ```

   ```
   cd questions-book-backend
   ```
2. If you are using [nvm](https://github.com/nvm-sh/nvm), or please check that you are using `Node >=18.0.0`
   ```sh
   nvm use
   ```

3. Install NPM packages via [NPM](https://www.npmjs.com/) package manager
   ```sh
   npm install
   ```

## Usage

## Working with migrations

```bash
# migrate
$ npm run migration:up

# revert last migration
$ npm run migration:down

# generate migration
$ export MIGRATION_NAME=<migration_name>
$ npm run migration:generate

# create empty migration
$ export MIGRATION_NAME=<migration_name>
$ npm run migration:create
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
