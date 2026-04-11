## Local development database and Docker

- For developmet, we use a local Postgres database running in Docker.
- The `docker-compose.yml` file is included.
- Install Docker Desktop (if on Windows or macOS).
- After cloning the repo for the first time, run `docker compose up -d` from the root of the repo.
- After that each time Docker Desktop runs, this container will also run.

## Environment variables

- In development, both `DATABASE_URL` and `DIRECT_URL` has the same URL.
- In production, it uses two URLs because of connection pooling. `DIRECT_URL` for Prisma CLI (migration, seeding etc.) and `DATABASE_URL` for runtime queries.
- `.env.development` holds values that are safe to be public, so it's intentionally committed.
- The production database credentials are in `.env.production.local`, which shouldn't be committed.

```json
"build": "NODE_ENV=production bun --bun next build",
"start": "NODE_ENV=production bun --bun next start",
```

- When the Next.js process runs, it will automatically set the correct `NODE_ENV` (`production` or `development`) based on the command you run. For example, `next build` will set `NODE_ENV=prodcution`, `next dev` will set `NODE_ENV=development`. Because of this we don't need to set the `NODE_ENV` ourselves as we currently have done in the `package.json` script.
- However, the reason it was needed was because of Bun.
- Bun auto loads environment variables. Bun also auto loads the `env.development` variables when `NODE_ENV` is undefined. https://github.com/oven-sh/bun/issues/13377
- So what happens when we run `bun --bun run build` without specifiyng the `NODE_ENV` is as below:
  - Bun auto loads the `env.development` file, which has the local `DATABASE` and `DIRECT` URLs.
  - After that, the Next.js process runs and sets `NODE_ENV=production`. Because `NODE_ENV` is production, Next.js loads the `env.production.local` file which has the has the production `DATABASE` and `DIRECT` urls. That is as expected.
  - However, because Bun already loaded those two variables from the `.env.development`, Next.js won't overwrite them. This results in `NODE_ENV=production` using local database URLs.
- So the fix was to explicitly define the `NODE_ENV` before calling the Bun process. That way in the `next build` command Bun won't auto load `env.development`.
- Another solution for this would be to [disable Bun's env auto loading feature completely](https://bun.com/docs/runtime/environment-variables#disabling-automatic-env-loading). But then some Prisma commands that run in isolation (without Next.js) will break as they can't auto load the env variables.

## Production database

- Use this command to run migrations on the production database: `bun --bun --env-file=.env.production.local prisma migrate deploy`.
- I just ran this one time using the terminal, so didn't want to add this to the `package.json` as a command.
- Ideally this should be called inside CI/CD (Ex: GitHub Actions) each time the app is deployed.
