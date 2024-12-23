import { Link, useOutletContext } from "react-router";

export default function ObservationsIndex() {
  const context = useOutletContext();
  // console.log("observations index context", context);

  return (
    <div>
      <h3>Your Observations for plant: {context.plant.name}</h3>
      {context.observations.map((observation) => (
        <div key={observation.id}>
          <Link
            className="bg-blue-400 text-white rounded p-2 m-2"
            to={`${observation.id}`}
          >
            Week of: {observation.weekOf.toLocaleDateString()}
          </Link>
        </div>
      ))}
    </div>
  );
}
