import { Button, Card } from "@heroui/react"
import { cacheTag } from "next/cache"

import { deleteUser } from "@/actions/actions"
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

      <ol className="grid max-h-100 gap-8 overflow-y-auto">
        {users.map((user) => (
          <li className="grid grid-cols-[1fr_auto] items-center" key={user.id}>
            <div>
              <span>{user.name}</span>
              <span className="text-muted block text-sm">{user.email}</span>
            </div>

            <form action={deleteUser}>
              <input defaultValue={user.id} name="id" hidden />
              <Button variant="danger" type="submit" size="sm">
                Delete
              </Button>
            </form>
          </li>
        ))}
      </ol>
    </Card>
  )
}
