import UserList from "@/components/UserList"
import Form from "@/components/Form"

export default function HomePage() {
  return (
    <main className="mx-auto grid max-w-lg gap-6">
      <Form />
      <UserList />
    </main>
  )
}
