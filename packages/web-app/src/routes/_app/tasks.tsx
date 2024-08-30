import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/tasks')({
  component: () => <div>Hello /_app/tasks!</div>
})