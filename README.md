# Student Portal App - Exam

## Local PostgreSQL Setup

This project uses PostgreSQL through Docker Compose for local development.

### Requirements

Before starting the database, make sure Docker Desktop is installed and running.

### Start PostgreSQL

From the project root folder, run:

```
docker compose up -d
```

This starts a PostgreSQL container in the background.

### Check Running Containers

```
docker ps
```

You should see the Compose services running under the project for this repo. The database service is `db`.

### Database Credentials

The local PostgreSQL database is configured with:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=student
```

These values should match the backend .`env` file.