# 🔮 TurboTalent AI — GitHub Developer Screener & Classifier

Welcome to **TurboTalent AI**, a high-end, SaaS-grade GitHub profile evaluation dashboard designed for high-velocity recruiting and developer assessment!

Developed for the **Build with AI Cloud Jakarta 2026** Hackathon.

---

## 🔗 Collaboration Hub

*   **GitHub Repository**: [akmalariq/turbo-robot](https://github.com/akmalariq/turbo-robot)
*   **Excalidraw Design Board**: [Collaborative Whiteboard](https://excalidraw.com/#room=20045e9f969c72920f85,hWqIHoNZerGmbyj5UFDC9Q)

---

## ⚙️ Features
1.  **Direct GitHub API Integration**: Queries live public profile & repository REST endpoints dynamically in the browser.
2.  **AI Skill & Language Profiling**: Measures repository counts, compiles language usage metrics, and presents them in a premium progress-graph dashboard.
3.  **Role Classification Engine**: Automatically analyzes stacks to recommend standard job positions (e.g. *Lead Systems Architect*, *Senior Frontend Architect*).
4.  **Developer Persona Characterization**: Evaluates community impact, repositories, and followers to describe coding habits (e.g., *The Prolific Hacker*, *The UI Pioneer*).
5.  **Offline Rate-Limit Fallback**: Preloaded profiles for *Linus Torvalds*, *Dan Abramov*, *TJ Holowaychuk*, and *Akmal Ariq* guarantee a 100% stable, fast live demo regardless of network congestion or API rate limiting.

---

## 🛠️ Technology Stack
*   **Frontend**: Vanilla HTML5, CSS3, ES6+ JavaScript
*   **Aesthetics**: Glassmorphism blur filters, glowing state indicators, Outfit and Fira Code custom Google Fonts (Linear/Vercel SaaS-inspired dark theme)
*   **Backend Server**: Zero-dependency local Node.js server with Server-Sent Events (SSE) stream routing.

---

## 🚀 How to Run Locally

### 📶 Host Collaborative Session:
Inside the root folder `/home/neo/projects/bwai-build`, launch the server:
```bash
node server.js
```
The server will output your local Wi-Fi access link:
```
📶 Wi-Fi Access: http://192.168.x.x:3000
🏠 Local Host:   http://localhost:3000
```
Teammates on the same Wi-Fi network can navigate to the **Wi-Fi Access IP** in their browser to access the live dashboard in real-time!
