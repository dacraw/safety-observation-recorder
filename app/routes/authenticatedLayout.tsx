import { Outlet } from "react-router";
import type { Route } from ".react-router/types/app/routes/+types/authenticatedLayout";
import { requireUser } from "~/session.server";
import Header from "~/components/header/header";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);
  return { user };
}

export default function AuthenticatedLayout({
  loaderData,
}: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div>
      {user ? (
        <>
          <Header user={user} />
          <Outlet />
        </>
      ) : null}
    </div>
  );
}
