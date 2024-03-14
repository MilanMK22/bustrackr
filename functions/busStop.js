const axios = require("axios");
const { DateTime } = require("luxon");

exports.handler = async (event, context) => {
  try {
    const stopId = event.queryStringParameters.stopId; // Access stopId from query parameters

    const apiKey = "vPzWzE9fCr7ca9TvoJXt8REMhHcHOSw2EQRq6Zua";

    // Make GET request to Metlink API
    const response = await axios.get(
      `https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=${stopId}`,
      {
        headers: {
          accept: "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    // Extract the departures array from the response data
    const departures = response.data.departures;

    // Calculate the time difference between the current time and the estimated arrival time for each prediction
    const currentTime = DateTime.now().setZone("Pacific/Auckland");
    currentTime.toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" });
    const predictionsWithTimeDifference = departures
      .slice(0, 5)
      .map((prediction) => {
        const estimatedArrivalTime = prediction.arrival.expected
          ? DateTime.fromISO(prediction.arrival.expected, {
              //if expected arrival time is null then just take the aimed departure
              zone: "Pacific/Auckland",
            })
          : DateTime.fromISO(prediction.departure.aimed, {
              zone: "Pacific/Auckland",
            });

        const formattedTime = DateTime.fromISO(estimatedArrivalTime, {
          zone: "Pacific/Auckland",
        }).toLocaleString({
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        const timeDifferenceMilliseconds = estimatedArrivalTime - currentTime;

        let timeDifference;
        if (timeDifferenceMilliseconds >= 0) {
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

        console.log("Time Difference:", timeDifference);
        return {
          busNumber: prediction.service_id,
          estimatedArrivalTime: prediction.arrival.expected,
          timeDifference: timeDifference, // Set negative time differences to null
          tripID: prediction.trip_id,
        };
      });

    // Return response with the predictions including the time difference
    return {
      statusCode: 200,
      body: JSON.stringify(predictionsWithTimeDifference),
    };
  } catch (error) {
    console.error("Error fetching bus stop data:", error);
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Stop not found" }),
    };
  }
};
