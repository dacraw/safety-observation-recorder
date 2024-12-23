import { Link, useOutletContext } from "react-router";

export default function ObservationsIndex() {
  const context = useOutletContext();
  // console.log(context);

  return (
    <div>
      <h3>Observations Index</h3>
      <h5>Select a Plant</h5>
      {context?.user?.userPlants.map((userPlant) => (
        <Link to={`/plants/${userPlant.plant.id}`}>{userPlant.plant.name}</Link>
      ))}
    </div>
  );
}
