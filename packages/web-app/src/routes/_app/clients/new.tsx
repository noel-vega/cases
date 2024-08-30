import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { InsertClientType } from "api/src/database/schema/clients.table";
import { ArrowLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_app/clients/new")({
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { register, handleSubmit } = useForm<InsertClientType>();
  const mutation = useMutation({
    mutationKey: [""],
    mutationFn: async (input: InsertClientType) => {
      const response = await api.clients.$post({
        json: input,
      });
      return await response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["clients"] });
      navigate({ to: "/clients" });
    },
  });

  return (
    <div className="max-w-7xl w-full mx-auto py-8">
      <div className="flex">
        <div className="flex items-center gap-4 flex-1">
          <Button asChild variant="outline">
            <Link to="/clients">
              <ArrowLeftIcon />
            </Link>
          </Button>
          <span className="text-sm"> Back to clients</span>
        </div>

        <h1 className="text-2xl  font-semibold">New Client</h1>
        <div className="flex-1" />
      </div>

      <Separator className="my-8" />

      <form
        onSubmit={handleSubmit((data) => {
          mutation.mutate(data);
        })}
        className="max-w-2xl mx-auto flex flex-col gap-4 w-full"
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <Label>First Name</Label>
            <Input {...register("firstName")} />
          </div>
          <div className="flex-1">
            <Label>Last Name</Label>
            <Input {...register("lastName")} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label>Phone</Label>
            <Input {...register("phone")} />
          </div>
          <div className="flex-1">
            <Label>Email</Label>

            <Input {...register("email")} />
          </div>
        </div>
        {/* <div>
            <Label>Address</Label>
            <Input />
          </div> */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
