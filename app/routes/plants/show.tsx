import { Link, Outlet, useOutletContext } from "react-router";
import type { Route } from "./+types/show";
import { prisma } from "~/db.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const observations = await prisma.observation.findMany({
    where: { plantId: Number(params.id) },
  });

  const plant = await prisma.plant.findFirst({
    where: { id: Number(params.id) },
  });

  const categories = await prisma.category.findMany({
    where: { plantId: Number(params.id) },
    include: { subcategories: { include: { questions: true } } },
  });

  return { categories, observations, plant };
}

export default function PlantShow({ loaderData }: Route.ComponentProps) {
  //   console.log("plant show loader data", loaderData?.categories);
  return (
    <div>
      <Link to="observations/new">New Observation</Link>

      <Outlet
        context={{
          categories: loaderData?.categories,
          plant: loaderData?.plant,
        }}
      />
    </div>
  );
}
