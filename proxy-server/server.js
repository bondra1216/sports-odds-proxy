require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const API_KEY = "4842a24d608b50321b296e213bb063b5";

app.get('/api/odds', async (req, res) => {
  const url = `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?regions=us&markets=h2h&bookmakers=draftkings&oddsFormat=american&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
