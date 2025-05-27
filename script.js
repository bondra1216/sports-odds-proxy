const output = document.getElementById('output');
const teamSelect = document.getElementById('teamSelect');

// Fetch odds and populate team list dynamically
async function loadTeams() {
  try {
    const response = await fetch("https://sports-odds-proxy-1.onrender.com/api/odds");
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const teams = new Set();

    data.forEach(game => {
      teams.add(game.home_team);
      teams.add(game.away_team);
    });

    teamSelect.innerHTML = Array.from(teams).sort().map(team =>
      `<option value="${team}">${team}</option>`
    ).join('');
  } catch (error) {
    output.innerText = `Error loading teams: ${error.message}`;
  }
}

document.getElementById('fetchOdds').addEventListener('click', async () => {
  const team = teamSelect.value;

  try {
    const response = await fetch("https://sports-odds-proxy-1.onrender.com/api/odds");
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();

    const filteredGames = data.filter(game =>
      game.home_team === team || game.away_team === team
    );

    if (filteredGames.length) {
      output.innerHTML = filteredGames.map(game => {
        const home = game.home_team;
        const away = game.away_team;
        const odds = game.bookmakers[0]?.markets[0]?.outcomes || [];
        return `<p><strong>${away} vs ${home}</strong><br>
          ${odds.map(o => `${o.name}: ${o.price}`).join('<br>')}</p>`;
      }).join('');
    } else {
      output.innerText = 'No upcoming games found for selected team in the next 24 hours.';
    }
  } catch (error) {
    output.innerText = `Error: ${error.message}`;
  }
});

loadTeams();
