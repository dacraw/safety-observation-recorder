// import { useAuth0 } from "@auth0/auth0-react";
import type { Organization, Plant, User, UserPlant } from "@prisma/client";
import { Link } from "react-router";
import Header from "~/components/header/header";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";

export function Welcome({
  user,
  plants,
  organization,
}: {
  user: User;
  plants: Plant[];
  organization: Organization;
}) {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("welcome user", user);
  return (
    <main className="">
      <div>Welcome {user.email}</div>
      <h5>Organization: {organization.name}</h5>
      <h3>Select A Plant</h3>
      {plants.map((plant) => (
        <Link key={plant.id} to={`/plants/${plant.id}`}>
          {plant.name}
        </Link>
      ))}
    </main>
  );
}
