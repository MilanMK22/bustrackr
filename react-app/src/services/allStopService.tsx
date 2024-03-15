import axios from "axios";

export async function fetchAllStopIds(): Promise<string[]> {
  try {
    const response = await axios.get<any[]>(
      "https://bus-trackr.netlify.app/.netlify/functions/allStops"
    );
    const stopIds: string[] = response.data.map((stop: any) => stop.stop_id);
    return stopIds;
  } catch (error) {
    console.error("Error fetching all stop IDs:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
