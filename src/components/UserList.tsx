import { cacheTag } from "next/cache"
import { Card } from "@heroui/react"

import { prisma } from "@/db/client"

export default async function UserList() {
  "use cache"
  cacheTag("users")
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <Card>
      <Card.Header>
        <Card.Title>User List</Card.Title>
        <hr />
      </Card.Header>

      <ol className="grid max-h-100 gap-4 overflow-y-auto">
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <span className="text-muted block text-sm">{user.email}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}
