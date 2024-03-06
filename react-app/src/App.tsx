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

  const handleSearch = async (searchValue: string) => {
    try {
      const response: any = await fetchBusStops(searchValue); // Explicitly declare response type as any
      if (response) { // Check if response and response.data exist
        setBusStops(response);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error retrieving bus stop information:", error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}></SearchBar>
    </div>
  );
}
export default App;
