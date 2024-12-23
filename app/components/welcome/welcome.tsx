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
  // console.log("welcome user", user);
  return (
    <main className="grid gap-2">
      <div>Welcome {user.email}</div>
      <h5 className="text-lg font-bold mb-4">
        Organization: {organization.name}
      </h5>
      <h3 className="font-bold">Select a plant below to begin:</h3>
      {plants.map((plant) => (
        <Link
          className="p-2 blue-button text-center"
          key={plant.id}
          to={`/plants/${plant.id}`}
        >
          {plant.name}
        </Link>
      ))}
    </main>
  );
}
