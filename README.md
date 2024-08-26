# ApplyMe website backend

Backend for ApplyMe website

## Requirements

### Node.js

Use [nvm](https://github.com/nvm-sh/nvm) to install node [lts/iron (v20.x)](https://nodejs.org/en/download/) or greater.

```bash
nvm install lts/iron
nvm use lts/iron
```

### PostgreSQL
<!-- Install postgresql and access to the PostgreSQL user -->
1) sudo apt update
2) sudo apt install postgresql postgresql-contrib
3) sudo -i -u postgres
4) psql

<!-- Create new user with password and then create db -->
5) CREATE USER myuser WITH PASSWORD 'mypassword';
6) GRANT ALL PRIVILEGES ON DATABASE new_database_name TO new_user_name;
7) CREATE DATABASE <db_name>;

<!-- execute the next command to list the existing db and check if it was created -->
8) \l

<!-- exit postgreSQL shell -->
9) \q
10) exit


### Sequelize
1) npm start 
<!-- Sequelize will create all the tables in db from models defined in models folder -->

<!-- You can check if tables where created successfully executing this commands -->
sudo -i -u postgres
psql
\c <db_name> (conect to db)
\dt (list tables created in db)
SELECT * FROM public."<table_name>";


### Linter

We use both [eslint](https://eslint.org/) and [prettier](https://prettier.io/).

Please review [VS Code](https://code.visualstudio.com/) plugins at [dev dependencies](package.json).

## Installation

Create the following files on the `project root`:

- `.env` for development

Please verify required environment variables at [.env.example](.env.example).

Install packages using [npm](https://www.npmjs.com/):

```bash
npm install
```

## Running

Start server:

```bash
npm start
```

Start server watching for file changes and reloading automatically using [nodemon](https://github.com/remy/nodemon/):

```bash
npm run dev
```

Output:

```json
{ "level": "info", "message": "App listening on port 3003!" }
```

Note: If the server is listening on other port than 3003, it might indicate that the environment variables were not properly taken into account. Double-check your configuration to ensure the correct port is being used.

## Tests

## API docs

Restart your server and see swagger-ui docs at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## License