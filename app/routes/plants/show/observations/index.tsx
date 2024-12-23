import { Link, useOutletContext } from "react-router";

export default function ObservationsIndex() {
  const context = useOutletContext();

  return (
    <div>
      <div className="grid mb-4">
        <h3 className="bg-gray-950 p-2 rounded block w-full">
          Plant: {context?.plant?.name}
        </h3>
      </div>
      <div className="grid gap-1">
        {context?.observations?.length > 0 ? (
          context.observations.map((observation) => (
            <Link
              key={observation.id}
              className="bg-blue-400 text-white rounded p-2 text-center"
              to={`${observation.id}`}
            >
              Week of: {observation.weekOf.toLocaleDateString()}
            </Link>
          ))
        ) : (
          <div className="grid gap-2">
            <p>You currently have no observations.</p>
            <Link to="new" className="blue-button">
              Create New Observation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
