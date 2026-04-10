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
- Bun auto loads environment variables. So unlike Node, we don't need to handle it using something like `dotenv`. We can just read the values. https://bun.com/docs/runtime/environment-variables
- Next.js also automatically loads environment variables: https://nextjs.org/docs/app/guides/environment-variables
- So in a Next.js project running on Bun, we have two different loaders loading environment variables.
- When Next.js loads the environment variables, it will respect variables that are already loaded into `process.env` and will not overwrite them. For example, if `process.env` already had a variable called `FOO`, Next.js won't overwrite it even if it comes across a variable with that name in one of the `.env` files.
- Bun auto loads `.env.development`, if `NODE_ENV` is undefined: https://github.com/oven-sh/bun/issues/13377
- In our setup we have the local `DATABASE_URL` and `DIRECT_URL` defined in `.env.development` and the production `DATABASE_URL` and `DIRECT_URL` defined in `.env.production.local`. But because Bun auto loads the `.env.development` when `NODE_ENV` is not defined, and also because Next.js won't overwrite any variables that are already defined in `process_env`, the variables in `.env.production.local` were never used even in production commands like `build`.
- To fix this we have two options:

1. Disabled auto env loading for Bun using it's config file. That way Next.js will be the only one responsible for loading the environment variables. https://bun.com/docs/runtime/environment-variables#disabling-automatic-env-loading
2. Explicitly defined the `NODE_ENV` before each command in the `package.json` file: `"build": "NODE_ENV=production next build"`.

- I went with the first option and disabled Bun from auto loading environment variables.

## Production database

- Use this command to run migrations on the production database: `bun --bun --env-file=.env.production.local prisma migrate deploy`.
- I just ran this one time using the terminal, so didn't want to add this to the `package.json` as a command.
- Ideally this should be called inside CI/CD (Ex: GitHub Actions) each time the app is deployed.
