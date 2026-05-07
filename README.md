# ChessDaddy

ChessDaddy is a Stockfish-powered chess analysis desktop application built with React and Electron. This repository contains the UI, services, and mock engine integration for local development.

> Note: The repository currently uses a mock Stockfish worker implementation (src/services/StockfishWorker.ts) for development. Replace it with a real Stockfish WebAssembly worker or native engine if you need accurate engine evaluations.

## Quick start (development)

1. Clone the repository and change into it:

   ```bash
   git clone https://github.com/chessdad/chessdaddy1.git
   cd chessdaddy1
   ```

2. Install dependencies (use legacy peer deps to avoid react-scripts / TypeScript peer conflicts):

   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the React development server only (recommended for faster iteration):

   ```bash
   npm run react-start
   ```

   - Open http://localhost:3000 in your browser to view the app.

4. To run the full Electron + React dev environment (requires electron installed):

   ```bash
   npm start
   ```

   This runs the React dev server and launches Electron when the server is ready.

## Build / Distribution

To build a packaged application (uses `electron-builder`):

```bash
npm run build
# or
npm run electron-build
```

Note: Building a packaged app requires native dependencies (Electron) and may need additional configuration for code signing on Windows/macOS.

## What I changed / current status

- Fixed multiple TypeScript and runtime issues related to the chess.js API compatibility (migrated to the v1 beta API such as `loadPgn()` and removed unsupported `sloppy` options).
- Resolved duplicate identifier issues and reserved-word usage (`eval` → `evalScore`).
- Added missing UI components and CSS files to provide working views for Analysis, Openings, Puzzles, Settings, and Game Analyzer.
- Added a mock Stockfish worker implementation at `src/services/StockfishWorker.ts` for local dev. This returns deterministic placeholder evaluations and best-move strings — replace with a real engine for production-quality analysis.

## Services (files of interest)

- `src/services/StockfishWorker.ts` — mock engine that simulates evaluation and best-move. Replace with real Stockfish WebAssembly worker for accurate analysis.
- `src/services/ChessComAPI.ts` — fetches game archives and latest month's games from Chess.com public API.
- `src/services/PGNParser.ts` — PGN parsing and move extraction using `chess.js`.
- `src/services/GameAnalyzer.ts` — simple analysis orchestration (currently simulated).
- `src/services/OpeningBook.ts` — opening lines / book (static in repo).
- `src/services/PuzzleGenerator.ts` and `src/services/PuzzleSystem.ts` — puzzle helpers and generator (basic).

## Troubleshooting

- If you see peer dependency errors (ERESOLVE) during `npm install`, run with `--legacy-peer-deps` as shown above.
- If `electron-squirrel-startup` or similar package gives `ETARGET` / not found errors, remove or update that dependency in `package.json`.
- If evaluations are nonsense: that's expected with the mock engine. To get real evaluations, integrate Stockfish (see "Replace mock Stockfish" below).

## Replace mock Stockfish with real engine (brief)

1. Use a Stockfish WebAssembly build such as `stockfish.wasm` or `stockfish.wasm.js` and run it inside a web worker.
2. Replace `src/services/StockfishWorker.ts` with an implementation that posts/receives UCI commands to/from the worker and exposes `evaluatePosition(fen, depth)` and `getBestMove(fen, depth)`.
3. Ensure the worker is included in the build (adjust CRA config or use a bundler that supports importing web workers).

## Testing chess.com integration

- The Chess.com API is public and rate-limited. `ChessComAPI.fetchUserGames(username)` fetches archives and then the latest archive.
- If fetching returns an empty list, ensure the username is correct and the account has recent games in archives. Check browser console for network errors.

## Development notes

- Use `npm run react-start` for fast iteration in the browser.
- Use `npm start` to launch both the React dev server and Electron (if you want the desktop experience).

## Contributing

1. Open an issue describing the bug or feature.
2. Create a branch and open a PR with tests and a description of the change.

---

If you'd like, I can:

- Integrate a real Stockfish WASM worker and wire it into the app.
- Improve PGN navigation (rewind/forward controls) and persistent move list UI.
- Add unit tests for PGN parsing and move validation.

Tell me which of the above you'd like me to do next and I'll implement it.