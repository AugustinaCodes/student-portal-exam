# Student Portal App - Exam

A streamlined, secure web application designed to manage student registrations, academic programs, and coursework module assignments. 

## Features
* **User Authentication:** Secure registration, login, and session persistence using Zustand local storage synchronization.
* **Student Registry:** Full CRUD functionality allowing administrators to create, read, update, and delete students.
* **Coursework Alignment:** Ability to create academic modules and dynamically assign/update multiple modules per student inside a safe database transaction layer.
* **Interactive UI:** A single-page dashboard layout built with React and Tailwind CSS featuring instant name/course filtering and total credit calculations.

---

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

## Backend Setup & run

Steps:

1. Navigate to your backend directory:

```
cd backend
```

2. Install the required server dependencies:

```
npm install
```

3. Start the backend development server:

```
npm run dev
```

## Frontend Setup & run

Steps:

1. Navigate to your frontend directory:

```
cd frontend/student-portal
```

2. Install the required client dependencies:

```
npm install
```

3. Start the local Vite development server:

```
npm run dev
```