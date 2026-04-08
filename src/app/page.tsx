import { TextField, Button, Input, Label, Card } from "@heroui/react"

import { register } from "@/actions/register"

export default function HomePage() {
  return (
    <main>
      <Card>
        <Card.Header>
          <Card.Title>Register</Card.Title>
          <Card.Description>Add new users to the database</Card.Description>
        </Card.Header>

        <form className="grid gap-4" action={register}>
          <TextField
            className="w-full max-w-64"
            variant="secondary"
            autoComplete="name"
            name="name"
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
          </TextField>

          <TextField
            className="w-full max-w-64"
            autoComplete="email"
            variant="secondary"
            name="email"
            type="email"
          >
            <Label>Email</Label>
            <Input placeholder="johndoe@email.com" />
          </TextField>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </main>
  )
}
