<p align="center">
  <img src="https://user-images.githubusercontent.com/44038381/122286239-ef2ad780-ceef-11eb-8000-bd91281e6148.png" alt="Sublime's custom image" width="40%"/>
</p>

# Amazonka - archery tournament organizer

Organize tournament with your own categories and settings, add participants and let our app help you track scores and manage the whole event!

Intuitive interface designed for desktop and mobile allows participants to input scores directly via phones or tablets.

Project was developed during Software Engineering classes at [AGH University Of Science And Technology](https://www.agh.edu.pl/)

## Table of Contents
  * [Functionalities](#functionalities)
    * [Homepage](#homepage)
    * [Competition view](#competition-view)
  * [Team](#team)
  * [Stack](#stack)
  * [Launch](#launch)
  * [Testing](#testing)
    * [Backend unit tests](#backend-unit-tests)
    * [Backend GraphQL tests](#backend-graphql-tests)
    * [Backend functional tests](#backend-functional-tests)
    * [Backend performance tests](#backend-performance-tests)
    * [Frontend unit tests](#frontend-unit-tests)
    * [Frontend functional tests](#frontend-functional-tests)
  * [Project status](#project-status)

## Functionalities
  * User can view
    * upcoming competitions
    * qualification results
    * schedule and tournament info
  * Organizer can also
    * register and login
    * modify
      * competitions
      * competition details
      * categories and distances
      * participants
      * target assignments
      * competitors scores
  * System will
    * generate target assignments
    * collect and compute scores
    * choose winners
    * help in searching for competitors using historical data

### Homepage

![image](https://user-images.githubusercontent.com/44038381/122610987-d867ba80-d080-11eb-842e-237eaac2a623.png)

### Competition view

![image](https://user-images.githubusercontent.com/44038381/122611177-2b417200-d081-11eb-9fe6-e41f5efe7715.png)

## Team
  * [Dariusz Biela](https://github.com/Darkosz1012) - Team Leader, Backend Architect
  * [Magdalena Górska](https://github.com/MagdalenaGie) - Frontend Architect
  * [Przemysław Skrobot](https://github.com/frogi16) - Tester Team Leader
  * [Weronika Wiszyńska](https://github.com/veroniqaa) - Frontend
  * [Aleksandra Rolka](https://github.com/AleksandraRolka) - Frontend
  * [Michał Żoczek](https://github.com/miczoc98) - Backend
  * [Maciej Pieczonka](https://github.com/pieczonkam) - Tester

## Stack
  * Backend
    * Node.js
    * MongoDB
    * Mongoose
    * GraphQL
    * Apollo Server
    * Express
    * jsonwebtoken
  * Frontend
    * React
    * Redux
    * Apollo Client
    * Bootstrap
  * Testing
    * Jest
    * Easy GraphQL Tester
    * React Testing Library
    * MongoDB Memory Server
    * Mockingoose
    * Supertest
    * Selenium
    * Easy GraphQL Load Tester
    * k6

## Launch
  1. Clone the repository
     * `git clone git@github.com:Darkosz1012/amazonka.git`
  1. Install packages for front and back with one simple command
     * `npm install`
  1. Create .env and fill with you settings:
```
ACCESS_TOKEN_SECRET = <key for access token authentication, should be generated randomly>
DATABASE_LINK = <mongodb+srv address>
PORT = <port number, 3001 by default and frontend settings should be aligned if set otherwise>
```
  1. Now you can launch application:
     1. Run backend:
        * `npm run`
     1. Run frontend:
        * `cd front`
        * `npm start`

## Testing
### Backend unit tests
At the moment there are unit tests mainly for functions and classes implementing complex logic, like authorization or data loaders. Mockingoose allows to mock values returned by Mongoose's functions.

Execution:
  * `npm run test-unit`

![Unit tests backend results](https://user-images.githubusercontent.com/44038381/122451895-f06c0b00-cfa8-11eb-86d0-bfa6349127b7.png)

### Backend GraphQL tests
These tests verify GraphQL queries according to schema. Useful for validation of required parameters and their types.

Execution:
  * `npm run test-graph`

![GraphQL tests backend results](https://user-images.githubusercontent.com/44038381/122452993-26f65580-cfaa-11eb-9208-7515bc341c91.png)

### Backend functional tests
Basic assumption is to test backend functionalities provided via GraphQL API. MongoDB In-Memory Server isolates tests from real database and makes them much faster, additionally allowing to assert DB content. Supertest is responsible for handling HTTP requests and responses. Custom test framework encapsulates logic tied with GraphQL queries and makes tests short, simple and descriptive.

Execution:
  * `npm run test-func`

![image](https://user-images.githubusercontent.com/44038381/122453970-18f50480-cfab-11eb-8fe2-9bba49b2a15d.png)

### Backend performance tests
For now performance tests are conducted on dummy database generated with generate_test_database.js (create perf.env like .env beforehand). Easy-graphql-load-tester generates queries for k6 runner, which needs to be installed on your machine separately and can be configured with number of virtual users, test duration and more. Results are presented in command line and dumped to .json files. Queries may be auto-generated from GraphQL schema or custom.

Execution:
  * start performance testing environment:
    * `npm run start-perf-env`
  * run tests in other terminal:
    * `npm run test-perf`

![image](https://user-images.githubusercontent.com/44038381/122602801-b61b7000-d073-11eb-8f1d-e361b3847746.png)

### Frontend unit tests
Unit tests for React components use React Testing Library and Jest for preparing state, executing actions, events and asserting their results.

Execution:
  * `npm run test-front`

### Frontend functional tests
Selenium-based suites of tests for frontend: logging in and out, adding competitions, navigating admin panel etc. It requires Selenium browser plugin and importing test files into it.

Execution:

![image](https://user-images.githubusercontent.com/44038381/122602896-d814f280-d073-11eb-983d-0400056a8f09.png)

## Project status
MVP is completed, although application is far from being finished. Project was handed for assignment on course's completion and graded positively, but requires more work and hopefully will be developed further.

Completed features are listed in [Functionalities](#functionalities) section.

Features in development:
  * generation and management of eliminations
  * inputting qualification scores by competitors verified with unique access codes
  * personal archer stats

Features planned:
  * generation of result cards for printing
  * preparing tournament summary
  * support for teams and mixed teams
