# Sports Odds Viewer

This project is a full-stack JavaScript demo that fetches live baseball betting odds using a free API, with a backend proxy to handle CORS and a clean front-end hosted via GitHub Pages.

## 🎯 Purpose

To demonstrate:
- Real-time API integration
- Backend proxy deployment
- Clean frontend-to-backend flow using JavaScript and Express
- Retry/backoff logic
- Professional deployment using GitHub + Render


---

## 🚀 Live Demo

**Frontend:**  
🔗 https://bondra1216.github.io/sports-odds-proxy/

**Backend API:**  
🔗 https://proxy-1.onrender.com/api/odds

---

## ⚙️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Node.js, Express, CORS, node-fetch
- **Deployment**: GitHub Pages + Render
- **Data Source**: The Odds API (https://the-odds-api.com)

---

## 📦 How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/bondra1216/sports-odds-proxy.git
   cd sports-odds-proxy
   ```

2. Set up the backend:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Add `.env` in `proxy-server/`:
     ```
     API_KEY=your_actual_odds_api_key
     ```

   - Start the server:
     ```bash
     npm start
     ```

3. Open `index.html` in your browser (or use Live Server)

---

## ✨ Features

- Dynamically fetches upcoming baseball games
- API proxy to bypass CORS
- Easy-to-use interface for selecting and fetching odds
- Deployed and ready to demo
- Retry/backoff logic in case the backend is cold-started (Render free tier)

---

## 👤 Author

Michael Darragh  
[GitHub: bondra1216](https://github.com/bondra1216)

---

## 📜 License

MIT — free to reuse and modify.
