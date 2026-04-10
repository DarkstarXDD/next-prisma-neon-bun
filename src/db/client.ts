import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaPg } from "@prisma/adapter-pg"

import { PrismaClient, Prisma } from "@/db/generated/prisma/client"
import env from "@/lib/env"

const adapter =
  process.env.NODE_ENV === "production"
    ? new PrismaNeon({ connectionString: env.DATABASE_URL })
    : new PrismaPg({ connectionString: env.DATABASE_URL })

const prisma = new PrismaClient({ adapter })

export { prisma, Prisma }
