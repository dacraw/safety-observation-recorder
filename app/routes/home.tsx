import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";
import { getUser } from "~/session.server";
import { prisma } from "~/db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  if (!user) return null;

  const userPlants = await prisma.userPlant.findMany({
    where: { userId: Number(user.id) },
    include: { plant: { include: { organization: true } } },
  });
  return { user, userPlants };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if (!loaderData) return null;

  const { user, userPlants } = loaderData;
  const plants = loaderData?.userPlants?.map(({ plant }) => plant);
  const organization = plants[0].organization;

  if (!user) return null;

  return (
    <div className="m-4 bg-gray-600 rounded p-2">
      <Welcome user={user} plants={plants} organization={organization} />
    </div>
  );
}
