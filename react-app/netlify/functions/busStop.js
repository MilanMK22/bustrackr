const axios = require("axios");
const { DateTime } = require("luxon");

// Function to fetch bus predictions from the Metlink API
async function fetchBusPredictions(stopId, apiKey) {
  const response = await axios.get(
    `https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=${stopId}`,
    {
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
      },
    }
  );
  return response.data.departures;
}

// Function to calculate the time difference between the current time and the estimated arrival time
function calculateTimeDifference(currentTime, prediction) {
  const estimatedArrivalTime = prediction.arrival.expected
    ? DateTime.fromISO(prediction.arrival.expected, {
        zone: "Pacific/Auckland",
      })
    : DateTime.fromISO(prediction.departure.aimed, {
        zone: "Pacific/Auckland",
      });

  const timeDifferenceMilliseconds = estimatedArrivalTime - currentTime;

  let timeDifference;
  if (timeDifferenceMilliseconds >= 0) {
    const formattedTime = DateTime.fromISO(estimatedArrivalTime, {
      zone: "Pacific/Auckland",
    }).toLocaleString({
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timeDifferenceMinutes = Math.ceil(
      timeDifferenceMilliseconds / (1000 * 60)
    );
    timeDifference =
      timeDifferenceMinutes >= 60
        ? formattedTime
        : `${timeDifferenceMinutes} minutes`;
  } else {
    timeDifference = "Due";
  }
  return timeDifference;
}

// Main handler function for the serverless function
exports.handler = async (event, context) => {
  try {
    const stopId = event.queryStringParameters.stopId;
    const apiKey = "vPzWzE9fCr7ca9TvoJXt8REMhHcHOSw2EQRq6Zua";
    const currentTime = DateTime.now().setZone("Pacific/Auckland");

    // Fetch bus predictions using the provided stopId and API key
    const departures = await fetchBusPredictions(stopId, apiKey);

    if (departures.length === 0) {
      // If there are no scheduled trips, return a custom message
      return {
        statusCode: 200,
        body: JSON.stringify([{ message: "No scheduled trips" }]),
      };
    }

    // Map over the departures to calculate time differences and format the predictions
    const predictionsWithTimeDifference = departures
      .slice(0, 5)
      .map((prediction) => ({
        busNumber: prediction.service_id,
        estimatedArrivalTime: prediction.arrival.expected,
        timeDifference: calculateTimeDifference(currentTime, prediction),
        tripID: prediction.trip_id,
      }));

    // Return the predictions with time differences as the response
    return {
      statusCode: 200,
      body: JSON.stringify(predictionsWithTimeDifference),
    };
  } catch (error) {
    // Handle errors and return appropriate response
    console.error("Error fetching bus stop data:", error);
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Stop not found" }),
    };
  }
};
