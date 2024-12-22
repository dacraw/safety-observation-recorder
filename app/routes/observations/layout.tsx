import { Outlet } from "react-router";
import ObservationsNavigation from "~/components/navigations/observations/observationsNavigation";
import type { Route } from ".react-router/types/app/routes/observations/+types/layout";
import { prisma } from "~/db.server";
import { getUserId } from "~/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await getUserId(request);

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: { id: Number(userId) },
    include: {
      userPlants: { include: { plant: { include: { categories: true } } } },
    },
  });

  return { user };
}

export default function ObservationsLayout({
  loaderData,
}: Route.ComponentProps) {
  // console.log(loaderData?.user);

  return (
    <main>
      <ObservationsNavigation />
      <Outlet context={{ user: loaderData?.user }} />
    </main>
  );
}
