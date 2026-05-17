# Quiz Builder Application

A full-stack quiz building application featuring a modern Next.js 15 frontend, an Express.js backend powered by TypeScript, Prisma ORM, and a PostgreSQL database. The entire eco-system is fully containerized using Docker.

---

## 🛠️ Project Setup & Installation

Follow these steps to spin up the database, backend server, and frontend application.

### 1. Environment Configuration

Before running the containers, ensure you have the correct production environment files in place:

- **Backend:** Create a file at `backend/.env.production` containing your database credentials and server configuration (`PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, etc.).
- **Frontend:** Create a file at `frontend/.env.production` with your frontend-specific variables (e.g., `NEXT_PUBLIC_API_URL`).

---

## 🚀 Running the Application via Docker Compose

To build and start the services in the correct order, run the following commands from the root directory of the project:

### Step 1: Start the Database

Launch the PostgreSQL database service first and let it run in detached mode:

```bash
docker compose --env-file backend/.env.production up --build -d db
```

### Step 2: Start the Backend Server

Once the database is healthy, build and start the Express API server:

```bash
docker compose --env-file backend/.env.production up --build -d server
```

The server will spin up and connect to the PostgreSQL database using Prisma Client.

If you are running the app for the first time, execute the Prisma migrations inside the backend container to generate the database tables:

```bash
docker compose exec server npx prisma migrate deploy
```

### Step 3: Start the Frontend App

Finally, build and run the Next.js production client container:

```bash
docker compose --env-file frontend/.env.production up --build -d app
```

To view the running containers and verify their statuses, you can run:

```bash
docker compose ps
```
