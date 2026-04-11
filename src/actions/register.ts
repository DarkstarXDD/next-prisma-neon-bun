"use server"

import { updateTag } from "next/cache"
import * as z from "zod"

import { Prisma, prisma } from "@/db/client"

// ------------------ Create User -----------------------
const userSchema = z.object({
  name: z.string("Invalid name").min(1, "Name cannot be empty"),
  email: z.email("Invalid email"),
})

export async function register(formData: FormData) {
  const data = Object.fromEntries(formData)

  const parsed = userSchema.safeParse(data)

  if (!parsed.success) {
    console.log("Server validation fails.")
    console.log(z.flattenError(parsed.error).fieldErrors)
    return
  }

  try {
    const user = await prisma.user.create({
      data: { name: parsed.data.name, email: parsed.data.email },
    })
    console.log(user)
    updateTag("users")
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.code)
      console.log("Email is already used")
      return
    }
  }
}

// ------------------ Delete User -----------------------
const userDeleteSchema = z.object({
  id: z.cuid("Invalid id format"),
})

export async function deleteUser(formData: FormData) {
  const data = Object.fromEntries(formData)
  const parsed = userDeleteSchema.safeParse(data)

  if (!parsed.success) {
    console.log("Server validation fails.")
    console.log(z.flattenError(parsed.error).fieldErrors)
    return
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parsed.data.id },
    })
    console.log("Deleted user", deletedUser)
    updateTag("users")
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.code)
      console.log("User not found")
      return
    }
  }
}
