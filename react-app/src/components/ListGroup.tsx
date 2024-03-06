interface BusStop {
  busNumber: string;
  estimatedArrivalTime: string | null;
  timeDifference: number | null;
}

interface Props {
  items: BusStop[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  const message = items.length === 0 ? <p>No Item Found</p> : null;
  return (
    <ul className="list-group">
      {message}
      {items.map((item) => (
        <li className="list-group-item" key={item.busNumber}>
          <strong>Bus Number:</strong> {item.busNumber} &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Time to Arrival:</strong> {item.timeDifference} minutes
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
