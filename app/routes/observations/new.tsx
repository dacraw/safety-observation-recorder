import { useForm } from "react-hook-form";
import { useSubmit } from "react-router";
import type { Route } from "./+types/new";
import { PrismaClient } from "@prisma/client";

export async function loader({request}: Route.LoaderArgs) {
  const prisma = new PrismaClient()
  // const categories = await prisma.
}

export async function action({ request }: Route.ActionArgs) {}

export default function NewObservation({ actionData }: Route.ComponentProps) {
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();
  const onSubmit = (data) => {
    submit(data, { method: "POST" });
  };

  return (
    <div>
      <h3>Create a new observation</h3>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
}
