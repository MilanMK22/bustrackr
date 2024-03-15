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
  // State variables
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [key, setKey] = useState<number>(0); // Unique key to force component remount
  const [error, setError] = useState<string | null>(null);

  // Function to handle search
  const handleSearch = async (searchValue: string) => {
    try {
      const response: any = await fetchBusStops(searchValue); // Explicitly declare response type as any
      if (response) {
        setBusStops(response);
        setKey((prevKey) => prevKey + 1);
        setError(null); // Reset error state
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      setBusStops([]);
      setError("Bus stop not found, please enter a valid stop"); // Set error state
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-150">
      <div>
        {/* Application title */}
        <h1 className="text-center mb-4 text-primary font-weight-bold">
          BusTrackr
        </h1>

        {/* Search bar component */}
        <SearchBar onSearch={handleSearch}></SearchBar>

        {/* Display error message if any */}
        {error && <div>Error: {error}</div>}

        {/* Display list of bus stops */}
        <ListGroup key={key} items={busStops} heading="buses"></ListGroup>
      </div>
    </div>
  );
}

export default App;
