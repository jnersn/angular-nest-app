# Angular Nest App

A full stack typescript app using angular on the frontend and nest for the api.

Postgres is used for storing the data.

## Requirements

```
Node 12.16.3
```

Using postgres with docker.

```
Docker 19.03.8
Docker Compose 1.25.5
```

Using a dedicated postgres installation.

```
Postgres 12.1
```

## Download

```
git clone git@github.com:jraisanen/angular-nest-app.git
```

## Configuration

Create a db connection config file. Just copying the example should get you
started if there are no conflicting connections.

```
cd angular-nest-app
cp ormconfig.example.json ormconfig.json
```

If using docker, make sure that `docker-compose.yml` have the same connection
details.

## Installation

Install angular and nest dependencies.

```
npm install
```

(For docker users) Install and start the postgres instance.

```
docker-compose up -d
```

## Start

Run both the api and client apps.

```
npm start
```

or

```
npm run start:api
npm run start:client
```
