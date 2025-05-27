const gamesList = document.getElementById("gamesList");

async function fetchGames() {
  try {
    const response = await fetch("https://proxy-1.onrender.com/api/odds");
    if (!response.ok) throw new Error("Failed to load games");

    const data = await response.json();
    if (!data.length) {
      gamesList.innerText = "No games available.";
      return;
    }

    const html = data.map((game, index) => {
      return `
        <div class="game" id="game-${index}">
          <strong>${game.away_team} @ ${game.home_team}</strong><br>
          <button onclick="fetchOdds(${index})">Get Odds</button>
          <div id="odds-${index}"></div>
        </div>
      `;
    }).join("");

    gamesList.innerHTML = html;
    window._gamesData = data;

  } catch (error) {
    gamesList.innerText = "Error loading games: " + error.message;
  }
}

async function fetchOdds(index) {
  const game = window._gamesData[index];
  const outcomes = game.bookmakers?.[0]?.markets?.[0]?.outcomes;

  if (!outcomes?.length) {
    document.getElementById(`odds-${index}`).innerText = "No odds available.";
    return;
  }

  const oddsText = outcomes.map(o => `${o.name}: ${o.price}`).join("<br>");
  document.getElementById(`odds-${index}`).innerHTML = oddsText;
}

fetchGames();
