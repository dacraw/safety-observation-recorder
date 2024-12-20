import { useAuth0 } from "@auth0/auth0-react";
import Header from "~/components/header/header";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";

export function Welcome() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <main className="">
      {isLoading ? <LoadingSpinner /> : <div>Welcome {user?.name}</div>}
    </main>
  );
}
