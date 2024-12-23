import { Link, NavLink, Outlet, useOutletContext } from "react-router";
import type { Route } from "./+types/show";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  const observations = await prisma.observation.findMany({
    where: { plantId: Number(params.id), userId: Number(userId) },
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
  return (
    <div>
      <nav className="grid grid-cols-2 justify-between items-center text-center py-2 mx-4">
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "active-nav-link" : "text-white"} font-bold`
          }
          to="observations/new"
        >
          New Observation
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            `${isActive ? "active-nav-link" : "text-white"} font-bold`
          }
          to="observations"
        >
          View Observations
        </NavLink>
      </nav>

      <Outlet
        context={{
          categories: loaderData?.categories,
          observations: loaderData?.observations,
          plant: loaderData?.plant,
        }}
      />
    </div>
  );
}
