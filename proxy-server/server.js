require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

// ✅ Allow your GitHub Pages origin
app.use(cors({
  origin: 'https://bondra1216.github.io'  // replace with your GitHub username
}));


const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

// Endpoint to fetch odds from The Odds API
app.get('/api/odds', async (req, res) => {
  console.log('Received request from frontend...');
  const url = `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?regions=us&markets=h2h&bookmakers=draftkings&oddsFormat=american&apiKey=${API_KEY}`;

  try {
    console.log('Requesting odds from The Odds API...');
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
