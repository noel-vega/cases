import { api } from "@/lib";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/clients/$id")({
  loader: async ({ params }) => {
    const response = await api.clients[":id{[0-9]+}"].$get({
      param: { id: params.id.toString() },
    });
    if (!response.ok) throw Error("");
    const client = await response.json();
    return { client };
  },
  component: Page,
});

function Page() {
  const { client } = Route.useLoaderData();
  return <div>{client.id}</div>;
}
