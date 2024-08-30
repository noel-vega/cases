import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { ClientType } from "api/src/database/schema/clients.table";
import { DataTable } from "@/components/data-table";
import { api } from "@/lib";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Banner } from "@/components/banner";
import { queryClient } from "@/lib/react-query";
import { z } from "zod";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import debounce from "debounce";

const clientSearchSchema = z
  .object({
    name: z.string(),
  })
  .partial();

export const getClients = async (query: { name?: string } = {}) => {
  const response = await api.clients.$get({ query });
  if (!response.ok) throw new Error("Server Error");
  const data = await response.json();
  return data;
};

export const Route = createFileRoute("/_app/clients/")({
  validateSearch: clientSearchSchema,
  beforeLoad: async ({ search }) => {
    const clients = await queryClient.fetchQuery({
      queryKey: ["clients"],
      queryFn: () => getClients(search),
    });
    return { clients };
  },
  loader: async ({ context }) => {
    return { clients: context.clients };
  },
  component: Page,
});

function Page() {
  const { clients } = Route.useLoaderData();
  const { name } = Route.useSearch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: { name },
  });
  return (
    <>
      <Banner>
        <div className="max-w-7xl mx-auto flex justify-between">
          <h1 className="text-3xl font-medium">Clients</h1>
        </div>
      </Banner>

      <div className="max-w-7xl mx-auto py-8 flex flex-col gap-8">
        <div className="flex gap-4">
          <form
            onSubmit={handleSubmit((search) => {
              navigate({ to: "/clients", search });
            })}
            className="flex-1"
          >
            <Input placeholder="Search clients..." {...register("name")} />
          </form>

          <Button asChild>
            <Link to="/clients/new">Add Client</Link>
          </Button>
        </div>
        <DataTable columns={columns} data={clients} />
      </div>
    </>
  );
}

const columns: ColumnDef<ClientType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    header: "Name",
    cell: ({ row }) => {
      return (
        <div>
          <Link
            to={`/clients/$id`}
            params={{ id: row.original.id.toString() }}
            className="font-medium text-blue-500 hover:underline"
          >
            {row.original.firstName} {row.original.lastName}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
