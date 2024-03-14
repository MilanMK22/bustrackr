import axios from "axios";

export async function fetchBusStops(searchValue: string): Promise<any[]> {
  try {
    const response = await axios.get<any[]>(
      `https://bustrackr-e09i.onrender.com/api/bus-stop/${searchValue}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving bus stop information:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
