import axios from "axios";

export async function fetchBusStops(searchValue: string): Promise<any[]> {
  try {
    const response = await axios.get<any[]>(
      `https://bus-trackr.netlify.app/.netlify/functions/busStop?stopId=${searchValue}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving bus stop information:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
