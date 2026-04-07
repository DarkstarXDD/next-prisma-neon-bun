import { PrismaPg } from "@prisma/adapter-pg"

import { PrismaClient, type Prisma } from "@/db/generated/prisma/client"
import env from "@/lib/env"

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export { prisma, Prisma }
