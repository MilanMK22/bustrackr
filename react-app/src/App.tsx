import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchBusStops } from "./services/busStopService";
import ListGroup from "./components/ListGroup";

interface BusStop {
  busNumber: string;
  estimatedArrivalTime: string | null;
  timeDifference: string | null;
  tripID: string | null;
}

function App() {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [key, setKey] = useState<number>(0); // Unique key to force component remount

  const handleSearch = async (searchValue: string) => {
    try {
      const response: any = await fetchBusStops(searchValue); // Explicitly declare response type as any
      if (response) {
        setBusStops(response);
        setKey((prevKey) => prevKey + 1);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error retrieving bus stop information:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-150">
      <div>
        <h1 className="text-center mb-4">BusTrackr</h1>
        <SearchBar onSearch={handleSearch}></SearchBar>
        <ListGroup key={key} items={busStops} heading="buses"></ListGroup>
      </div>
    </div>
  );
}
export default App;
