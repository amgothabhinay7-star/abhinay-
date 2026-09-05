const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get random joke
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    res.json({
      type: response.data.type,
      setup: response.data.setup,
      punchline: response.data.punchline,
      id: response.data.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

// Get joke by type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const response = await axios.get(
      `https://official-joke-api.appspot.com/jokes/${type}/random`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

// Get multiple jokes
router.get('/multiple/:count', async (req, res) => {
  try {
    const { count } = req.params;
    const response = await axios.get(
      `https://official-joke-api.appspot.com/jokes/random/${count}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jokes' });
  }
});

module.exports = router;
