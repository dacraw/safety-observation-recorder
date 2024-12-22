// import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "@prisma/client";
import Header from "~/components/header/header";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";

export function Welcome({ user }: { user: User }) {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <main className="">
      <div>Welcome {user.email}</div>
    </main>
  );
}
