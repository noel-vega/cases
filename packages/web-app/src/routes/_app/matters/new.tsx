import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { ClientType } from "api/src/database/schema/clients.table";
import { ArrowLeftIcon, MinusIcon, PlusIcon } from "lucide-react";

import { getClients } from "../clients";
import { queryClient } from "@/lib/react-query";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/matters/new")({
  loader: async () => {
    const clients = await queryClient.fetchQuery({
      queryKey: ["clients"],
      queryFn: () => getClients(),
    });
    return { clients };
  },
  component: Page,
});

type Store = {
  name: string;
  clients: ClientType[];
  addClient: (client: ClientType) => void;
  removeClient: (id: number) => void;
  setName: (name: string) => void;
};

const useStore = create<Store>()((set) => ({
  name: "",
  clients: [],
  setName: (name) => set(() => ({ name })),
  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),
  removeClient: (id) =>
    set((state) => ({ clients: state.clients.filter((c) => c.id !== id) })),
}));

function Page() {
  const { name, setName, clients, removeClient } = useStore();
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex">
        <div className="flex items-center gap-4 flex-1">
          <Button asChild variant="outline">
            <Link to="/matters">
              <ArrowLeftIcon />
            </Link>
          </Button>
          <span className="text-sm"> Back to matters</span>
        </div>

        <h1 className="text-2xl  font-semibold">New Matter</h1>
        <div className="flex-1" />
      </div>

      <Separator className="my-8" />

      <form
        onSubmit={() => {}}
        className="max-w-xl mx-auto flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Clients</Label>
          <ul className="divide-y ">
            {clients.map((client) => (
              <li className="flex items-center gap-6 py-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {client.firstName.split("")[0]}
                    {client.lastName.split("")[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>
                    {client.firstName} {client.lastName}
                  </p>
                  <p>{client.email}</p>
                </div>
                <div className="ml-auto">
                  <Button
                    onClick={() => removeClient(client.id)}
                    type="button"
                    size="sm"
                    variant="destructive"
                  >
                    <MinusIcon size={16} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <AddClientsDrawer />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

function AddClientsDrawer() {
  const { clients } = Route.useLoaderData();
  const [search, setSearch] = useState("");
  useEffect(() => {
    getClients();
  }, []);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Client</Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[80%]">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Add clients</DrawerTitle>
            <DrawerDescription>
              Search and add clients to your matter
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-6">
            <div>
              <Input
                placeholder="Search clients..."
                value={search}
                onInput={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
            <DataTable columns={columns} data={clients} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const columns: ColumnDef<ClientType>[] = [
  {
    header: "Name",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.firstName} {row.original.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "add",
    cell: ({ row }) => {
      const { addClient, removeClient, clients } = useStore();

      const alreadyAdded = clients.find((c) => c.id === row.original.id)
        ? true
        : false;

      if (alreadyAdded) {
        return (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => removeClient(row.original.id)}
          >
            <MinusIcon size={18} />
          </Button>
        );
      } else {
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => addClient(row.original)}
          >
            <PlusIcon size={18} />
          </Button>
        );
      }
    },
  },
];
