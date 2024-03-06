import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchBusStops } from "./services/busStopService";
import ListGroup from "./components/ListGroup";

interface BusStop {
  busNumber: string;
  estimatedArrivalTime: string | null;
  timeDifference: number | null;
}

function App() {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [key, setKey] = useState<number>(0); // Unique key to force component remount

  const handleSearch = async (searchValue: string) => {
    try {
      const response: any = await fetchBusStops(searchValue); // Explicitly declare response type as any
      if (response) {
        // Check if response and response.data exist
        setBusStops(response);
        setKey((prevKey) => prevKey + 1);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error retrieving bus stop information:", error);
    }
  };

  useEffect(() => {
    console.log(busStops);
  }, [busStops]); // Log busStops whenever it changes

  return (
    <div>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <ListGroup key={key} items={busStops} heading="buses"></ListGroup>
    </div>
  );
}
export default App;
