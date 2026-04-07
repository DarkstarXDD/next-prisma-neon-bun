import * as z from "zod"

const envSchema = z.object({
  DIRECT_URL: z.url("Direct database URL is not defined"),
  DATABASE_URL: z.url("Database URL is not defined"),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.log("Error loading environment variables!")
  console.log(z.flattenError(parsed.error).fieldErrors)
  process.exit(1)
}

const env = parsed.data
export default env
