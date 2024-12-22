import { Link } from "react-router";

export default function ObservationsNavigation() {
  return (
    <nav className="mb-6">
      <Link to="new" className="bg-blue-400 text-white p-2 rounded">
        New Observation
      </Link>
    </nav>
  );
}
