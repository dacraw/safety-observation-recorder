import { Outlet } from "react-router";
import ObservationsNavigation from "~/components/navigations/observations/observationsNavigation";

export default function ObservationsLayout() {
  return (
    <main>
      <ObservationsNavigation />
      <Outlet />
    </main>
  );
}
