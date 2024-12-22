import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";
import { getUser } from "~/session.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  return { user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  if (!user) return null;

  return <Welcome user={loaderData.user!} />;
}
