# Project Overview

Link: [React GraphQL Town Square App](https://react-graphql-townsquare-app.vercel.app/ - Not working anymore due to free server domain.)

A full-stack application that displays list of posts and has a capability to reorder persistently via drag and drop.
The application supports infinite scrolling and real-time updates to improve user experience performance.

## Infinite Scrolling

The application initially displays 40 posts and when the user scrolls down to the bottom of the page. It will load another 40 posts and so on.

## Real-time updates

The application supports real-time posts whenever the posts are moved or the order of the posts changes accross multiple tabs or windows.

## Project Structure

The project uses a monorepo stucture to manage both the backend and fronted into a single repository. I just decided to use
a monorepo since this application is intended only for assessment but ideally, the backend and frontend should be separated
into each repositories for maintainability and flexibility.

## Directory Structure

The project contains two main folders: backend and frontend.

### Backend Directory

- Location: `/backend`
- Tech stack: Node.js, GraphQL, Apollo Server, TypeORM, TypeScript, MySQL

I design the backend to use Feature-based modular architecture in which the files are grouped based on their
functionality such as entities, schemas, resolvers, etc. I also added the services design pattern to isolate the
application's business logic.

### Frontend Directory

- Location: `/frontend`
- Tech stack: React, Typescript, MUI

I design the frontend to use Feature-based modular architecture (as well) in which the files are grouped based on their
functionality such as entities, components, hooks, queries, pages, etc.

# Setup instructions

## Requirements

- Tested on Node.js v20.15.1
- Tested on MySQL version 8

## Installation

Clone this repository in your local machine.

### Backend setup

1. Setup your mysql database.
2. Go inside the backend directory .
3. Copy the `.env.example` to `.env` (create if does not exist).
4. Fill in the details required especially mysql connection.
5. Run command `npm install` to install dependencies.
6. Run command `npm run migration:run` to migrate database tables.
7. Run command `npm run seeder:run` to populate database tables with mock data (Should only be run once).
8. Run command `npm run build` to build files.
9. Run command `npm run start` to start the backend server.
10. You can access the backend server now through [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Frontend setup

2. Go inside the backend directory .
3. Copy the `.env.example` to `.env` (create if does not exist).
4. Fill in the details required especially the URL endpoint to the backend server.
5. Run command `npm install` to install dependencies.
6. Run command `npm run build` to build files.
7. Run command `npm run start` to start the app.
8. You can access the app now through [http://localhost:3000](http://localhost:3000)

# Available Scripts

There are only a few custom scripts available.

## Backend

- `npm run migration:generate` - Generate migration files according to the typeorm entities created.
- `npm run migration:run` - Run the migration files generated.
- `npm run migration:rever` - Rollback the migration files executed.
