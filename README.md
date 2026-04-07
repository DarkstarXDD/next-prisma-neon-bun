## Local development database and Docker

- For developmet, we use a local Postgres database running in Docker.
- The `docker-compose.yml` file is included. It references environment variables defined in `.env` for database credentials.
- `docker-compose.yml` auto loads environment variables defined in a `.env` file at the same directory. So we don't have to do anything extra to load those variables.
- Install Docker Desktop (if on Windows or macOS).
- After cloning the repo for the first time, run `docker compose up -d` from the root of the repo.
- After that each time Docker Desktop runs, this container will also run.
- In development, both `DATABASE_URL` and `DIRECT_URL` has the same URL.
- In production, it uses two URLs because of connection pooling. `DIRECT_URL` for Prisma CLI (migration, seeding etc.) and `DATABASE_URL` for runtime queries.

## Environment variables

- `.env` holds values that are safe to be public, so it's intentionally committed.
- The production database credentials are in `.env.production.local`, which shouldn't be committed.
