import type { ActionFunction, LoaderFunction } from "react-router";
import { redirect } from "react-router";

import { logout } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("heyo logout action");
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  console.log("heyo logout loader");
  return redirect("/");
};
