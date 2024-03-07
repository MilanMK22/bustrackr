interface BusStop {
  busNumber: string;
  estimatedArrivalTime: string | null;
  timeDifference: string | null;
  tripID: string | null;
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
        <li className="list-group-item" key={item.tripID}>
          <strong>Bus Number:</strong> {item.busNumber} &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Time to Arrival:</strong> {item.timeDifference}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
