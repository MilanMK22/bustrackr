const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/bus-stop/:stopId', async (req, res) => {
  try {
    const stopId = req.params.stopId;
    const apiKey = 'vPzWzE9fCr7ca9TvoJXt8REMhHcHOSw2EQRq6Zua'; // Replace with your actual Metlink API key

    // Make GET request to Metlink API
    const response = await axios.get(`https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=${stopId}`, {
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey
      }
    });

         // Extract the departures array from the response data
    const departures = response.data.departures;

    // Calculate the time difference between the current time and the estimated arrival time for each prediction
    const currentTime = new Date();
    const predictionsWithTimeDifference = departures.slice(0, 5).map(prediction => {
      const estimatedArrivalTime = new Date(prediction.arrival.expected);
      console.log('Bus ID: ', prediction.service_id)
      console.log('Estimated Arrival Time:', estimatedArrivalTime);
      console.log('Current Time:', currentTime);
      const timeDifferenceMilliseconds = estimatedArrivalTime - currentTime;
      console.log('Time Difference (Milliseconds):', timeDifferenceMilliseconds);
      const timeDifferenceMinutes = Math.ceil(timeDifferenceMilliseconds / (1000 * 60)); // Convert milliseconds to minutes and round up
      console.log('Time Difference (Minutes):', timeDifferenceMinutes);
      return {
        busNumber: prediction.service_id,
        estimatedArrivalTime: prediction.arrival.expected,
        timeDifference: timeDifferenceMinutes >= 0 ? timeDifferenceMinutes : null // Set negative time differences to null
      };
    });

    // Send response back to client with the predictions including the time difference
    res.json(predictionsWithTimeDifference);
  } catch (error) {
    console.error('Error fetching bus stop data:', error);
    res.status(500).json({ error: 'An error occurred while fetching bus stop data' });
  }
});

module.exports = router;