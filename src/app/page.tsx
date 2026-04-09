import UserList from "@/components/UserList"
import Form from "@/components/Form"

export default function HomePage() {
  return (
    <main className="grid gap-6">
      <Form />
      <UserList />
    </main>
  )
}
