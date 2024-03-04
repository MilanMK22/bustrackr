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

    const firstFivePredictions = response.data.slice(0, 5);

    // Send response back to client
    res.json(firstFivePredictions);
  } catch (error) {
    console.error('Error fetching bus stop data:', error);
    res.status(500).json({ error: 'An error occurred while fetching bus stop data' });
  }
});

module.exports = router;