import { createUserSession } from "~/session.server";
import type { Route } from "./+types/demoSupervisorLogin";
import { verifyLogin } from "~/models/user.server";

export const action = async ({ request }: Route.ActionArgs) => {
  const user = await verifyLogin(
    process.env["DEMO_SUPERVISOR_EMAIL"]!,
    process.env["DEMO_SUPERVISOR_PASSWORD"]!
  );

  if (!user) return null;

  return await createUserSession({
    request,
    userId: Number(user.id),
    remember: false,
    redirectTo: "/",
  });
};
