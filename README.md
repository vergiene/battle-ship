# Sea Battle

A browser-based Battleship game — play against an AI opponent on a classic 10×10 board with Russian Battleship rules (no diagonal ship adjacency).

https://battle-ship-vergiene.netlify.app/

![Gameplay screenshot](/docs/screenshot.png)

## Tech stack

- Vanilla JavaScript (ES modules)
- Vite (build tool / dev server)
- CSS Grid (board layout and legend)
- SVG icons from [Lucide](https://lucide.dev/)
- Deployed on Netlify

## Architecture

The game logic is split into three classes with separate responsibilities. `Ship` only tracks its own size, orientation, and hit state — it knows nothing about where it sits on the board. `Board` owns the grid and is the single source of truth for ship position: it validates placement (bounds, overlap, adjacency), records attacks, and reports cell state. `Player` (and its subclasses `HumanPlayer` and `AIPlayer`) only decide *what move to make* — a placement or an attack coordinate — and never touch rendering or grid storage directly. Rendering is a separate layer (`render.js`) that reads `Board` state and draws it; `Board` itself has no knowledge of the DOM.

## Running locally

```bash
git clone https://github.com/vergiene/battle-ship.git
cd battle-ship
npm install
npm run dev
```
