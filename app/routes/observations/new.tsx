import { useForm } from "react-hook-form";
import { useOutletContext, useSubmit } from "react-router";
import type { Route } from "./+types/new";
import { PrismaClient } from "@prisma/client";

export async function loader({ request }: Route.LoaderArgs) {
  const prisma = new PrismaClient();

  // const categories = await prisma.
}

export async function action({ request }: Route.ActionArgs) {}

export default function NewObservation({ actionData }: Route.ComponentProps) {
  const { register, handleSubmit } = useForm();
  const context = useOutletContext();
  // console.log(context);
  const submit = useSubmit();
  const onSubmit = (data) => {
    submit(data, { method: "POST" });
  };

  return (
    <div>
      <h3 className="font-bold text-xl mb-6">Create a new observation</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="grid mb-6">
          <label>Current Plant</label>
          <select>
            {context?.user?.userPlants?.map((userPlant) => (
              <option value={userPlant?.plant?.id}>
                {userPlant?.plant?.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          {context?.user?.userPlants?.map((userPlant) => (
            <div>
              <label>{userPlant?.plant?.id}</label>
            </div>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
