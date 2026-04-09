import { Card } from "@heroui/react"

import { prisma } from "@/db/client"

export default async function UserList() {
  const users = await prisma.user.findMany()

  return (
    <Card>
      <Card.Header>
        <Card.Title>User List</Card.Title>
        <hr />
      </Card.Header>

      <ul className="grid gap-4">
        {users.map((user) => (
          <li className="grid" key={user.id}>
            <span>{user.name}</span>
            <span className="text-muted text-sm">{user.email}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
