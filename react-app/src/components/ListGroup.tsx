interface BusStop {
  busNumber: string;
  estimatedArrivalTime: string | null;
  timeDifference: string | null;
  tripID: string | null;
}

interface Props {
  items: BusStop[];
}

function ListGroup({ items }: Props) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li className="list-group-item" key={item.tripID}>
          <strong>Bus Number:</strong> {item.busNumber} &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Estimated Arrival:</strong> {item.timeDifference}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
