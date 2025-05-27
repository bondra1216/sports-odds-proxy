const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const allowedOrigins = ['https://bondra1216.github.io'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  }
}));

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

app.get('/api/odds', async (req, res) => {
  console.log('Received request from frontend...');
  const url = `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?regions=us&markets=h2h&bookmakers=draftkings&oddsFormat=american&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('API error:', data);
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
