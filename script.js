// Get a reference to the container where all games will be displayed
const gamesList = document.getElementById("gamesList");

// This function fetches a list of upcoming MLB games from the backend
async function fetchGames() {
  try {
    // Make a GET request to our proxy server (which fetches from The Odds API)
    const response = await fetch("https://sports-odds-proxy-1.onrender.com/api/odds");
    if (!response.ok) throw new Error("Failed to load games");

    const data = await response.json();

    // If there are no games returned, show a message
    if (!data.length) {
      gamesList.innerText = "No games available.";
      return;
    }

    // Build HTML for each game with a "Get Odds" button
    const html = data.map((game, index) => {
      return `
        <div class="game" id="game-${index}">
          <strong>${game.away_team} @ ${game.home_team}</strong><br>
          <button onclick="fetchOdds(${index})">Get Odds</button>
          <div id="odds-${index}"></div>
        </div>
      `;
    }).join("");

    // Inject the built HTML into the DOM
    gamesList.innerHTML = html;

    // Store the raw game data globally so we can look it up later
    window._gamesData = data;

  } catch (error) {
    // Show any errors (like network issues or API downtime)
    gamesList.innerText = "Error loading games: " + error.message;
  }
}

// Called when a user clicks "Get Odds" for a specific game
async function fetchOdds(index) {
  const game = window._gamesData[index];

  // Check if the bookmaker and odds data are available
  const outcomes = game.bookmakers?.[0]?.markets?.[0]?.outcomes;

  // If odds are missing or incomplete, show a message
  if (!outcomes?.length) {
    document.getElementById(`odds-${index}`).innerText = "No odds available.";
    return;
  }

  // Format and display the odds data under the game
  const oddsText = outcomes.map(o => `${o.name}: ${o.price}`).join("<br>");
  document.getElementById(`odds-${index}`).innerHTML = oddsText;
}

// Load the list of games as soon as the page loads
fetchGames();
