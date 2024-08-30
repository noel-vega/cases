import { Banner } from "@/components/banner";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib";
import { queryClient } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { MatterType } from "api/src/database/schema/matters.table";
import { SearchIcon } from "lucide-react";

async function getMatters() {
  const response = await api.matters.$get();
  if (!response.ok) throw new Error("Could not get matters");
  return await response.json();
}

export const Route = createFileRoute("/_app/matters/")({
  loader: async () => {
    const matters = await queryClient.fetchQuery({
      queryKey: ["matters"],
      queryFn: getMatters,
    });

    return { matters };
  },
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  const matters = useQuery({
    queryKey: ["matters"],
    queryFn: () => getMatters(),
    initialData: data.matters,
  });
  return (
    <div>
      <Banner>
        <div className="max-w-7xl mx-auto flex justify-between">
          <h1 className="text-3xl font-medium">Matters</h1>
        </div>
      </Banner>

      <div className="max-w-7xl mx-auto py-8 flex flex-col gap-8">
        <div className="flex gap-4">
          <Input
            placeholder="Search matters..."
            icon={<SearchIcon size={18} className="text-gray-500" />}
          />
          <Button asChild>
            <Link to="/matters/new">Add Matter</Link>
          </Button>
        </div>
        <DataTable columns={columns} data={matters.data} />
      </div>
    </div>
  );
}

const columns: ColumnDef<MatterType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
];
