const axios = require("axios");

// Function to fetch all stop IDs from the Metlink API
async function fetchAllStopIds(apiKey) {
  try {
    const response = await axios.get(
      "https://api.opendata.metlink.org.nz/v1/gtfs/stops",
      {
        headers: {
          accept: "application/json",
          "x-api-key": apiKey,
        },
      }
    );
    const stopIds = response.data
      .map((stop) => stop.stop_id)
      .filter((stopId) => /^\d+$/.test(stopId));

    return stopIds;
  } catch (error) {
    console.error("Error fetching all stop IDs:", error);
    throw error;
  }
}
exports.handler = async (event, context) => {
  try {
    const apiKey = "vPzWzE9fCr7ca9TvoJXt8REMhHcHOSw2EQRq6Zua";
    const allStopIds = await fetchAllStopIds(apiKey);

    return {
      statusCode: 200,
      body: JSON.stringify(allStopIds),
    };
  } catch (error) {
    console.error("Error handling request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};