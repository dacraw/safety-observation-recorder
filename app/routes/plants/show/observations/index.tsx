import { Link, useOutletContext } from "react-router";

export default function ObservationsIndex() {
  const context = useOutletContext();
  // console.log("observations index context", context);

  return (
    <div>
      <div className="grid mb-4">
        <h3 className="bg-gray-950 p-2 rounded block w-full">
          Plant: {context?.plant?.name}
        </h3>
      </div>
      <div className="grid gap-1">
        {context.observations.map((observation) => (
          <Link
            key={observation.id}
            className="bg-blue-400 text-white rounded p-2 text-center"
            to={`${observation.id}`}
          >
            Week of: {observation.weekOf.toLocaleDateString()}
          </Link>
        ))}
      </div>
    </div>
  );
}
