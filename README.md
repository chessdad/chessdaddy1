# ChessDaddy - Stockfish-Powered Chess Analysis Desktop App

A modern desktop application for chess analysis powered by Stockfish 18, featuring real-time game analysis, puzzle generation, and Chess.com integration.

## Features

✨ **Core Features**
- Local Stockfish 18 engine integration (no cloud processing)
- Real-time position analysis with configurable depth
- Interactive chessboard with smooth animations
- Chess.com game fetching and analysis
- Infinite puzzle mode with dynamic difficulty scaling
- Opening explorer with master game statistics
- Move classification system (Brilliant, Great, Best, Good, Inaccuracy, Mistake, Blunder)
- Dark mode support
- Complete offline functionality after installation

## System Requirements

- Windows 10 or later (64-bit)
- 2GB RAM minimum
- 500MB disk space

## Installation

### Option 1: Download Pre-built Executable (Easiest)

1. Visit the [Releases](https://github.com/typp3212/chessdaddy/releases) page
2. Download the latest `ChessDaddy.exe`
3. Run the installer
4. Launch ChessDaddy from your Start Menu or Desktop shortcut

### Option 2: Build from Source

#### Prerequisites
- Node.js (v16 or later) - Download from [nodejs.org](https://nodejs.org)
- Git - Download from [git-scm.com](https://git-scm.com)

#### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/typp3212/chessdaddy.git
   cd chessdaddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Download Stockfish 18**
   - Download from [stockfishchess.org](https://stockfishchess.org/download/)
   - Extract and place `stockfish.exe` in `./engines/` folder
   - Create the engines folder if it doesn't exist:
     ```bash
     mkdir engines
     ```

4. **Run in development mode**
   ```bash
   npm start
   ```

5. **Build executable**
   ```bash
   npm run build-exe
   ```
   The `.exe` file will be in the `dist/` folder

## Usage

### Analysis Board
- Import PGN files or enter FEN positions
- Real-time Stockfish analysis
- View best moves and evaluations
- Interactive move history

### My Games
- Enter your Chess.com username
- Automatically fetches your public games
- Analyze accuracy, move classifications, and statistics
- Review detailed game analysis

### Puzzle Mode
- Infinite puzzle stream
- Dynamic difficulty scaling based on performance
- Puzzle rating display
- Streak tracking

### Opening Explorer
- Explore openings with master game statistics
- Win/draw/loss rates for each position
- Navigate through move sequences

### Settings
- Dark mode toggle
- Engine analysis depth configuration
- Sound effects and animation toggles
- Board size customization

## Project Structure

```
chessdaddy/
├── public/
│   ├── index.html
│   ├── electron.js           # Main Electron process
│   └── preload.js            # Preload script for IPC
├── src/
│   ├── components/
│   │   ├── AnalysisBoard.tsx
│   │   ├── Chessboard.tsx
│   │   ├── GameAnalyzer.tsx
│   │   ├── PuzzleMode.tsx
│   │   ├── OpeningExplorer.tsx
│   │   └── Settings.tsx
│   ├── services/
│   │   ├── ChessEngine.ts    # Stockfish integration
│   │   ├── ChessComAPI.ts    # Chess.com API wrapper
│   │   ├── PuzzleGenerator.ts
│   │   └── MoveClassifier.ts
│   ├── styles/               # CSS modules
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration

Settings are stored locally in `~/.config/chessdaddy/` on Windows.

### Customizable Settings
- **Engine Depth**: 10-30 (default: 20)
- **Board Size**: Small, Medium, Large
- **Dark Mode**: On/Off
- **Sound Effects**: On/Off
- **Animations**: On/Off

## Development

### Available Scripts

```bash
# Start development server
npm start

# Build React app
npm run react-build

# Build Electron app
npm run electron-build

# Create Windows executable
npm run build-exe

# Run tests
npm test
```

### Adding New Features

1. Create components in `src/components/`
2. Create services in `src/services/`
3. Import and use in main App component
4. Style with CSS files in `src/styles/`

## API Integration

### Chess.com API
- No authentication required for public games
- Endpoints used:
  - `/pub/player/{username}/games`
  - `/pub/player/{username}/stats`
  - `/pub/player/{username}`

### Stockfish Engine
- Local binary integration via UCI protocol
- No external API calls
- Full offline support

## Troubleshooting

### "Stockfish not found" error
- Ensure `stockfish.exe` is in the `./engines/` folder
- Download from [stockfishchess.org](https://stockfishchess.org/download/)

### Application won't start
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Clear cache: `npm cache clean --force`

### Chess.com username not found
- Verify the username is spelled correctly
- Ensure the account has public games
- Check your internet connection

## Performance Optimization

- Analysis depth limited to 30 for responsiveness
- Puzzle generation cached locally
- Minimal re-renders with React hooks
- Efficient board representation

## Future Features

- [ ] Lichess.org integration
- [ ] PGN file import/export
- [ ] Opening repertoire builder
- [ ] Endgame tablebase support
- [ ] Online multiplayer
- [ ] Mobile companion app
- [ ] Machine learning move suggestions

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/typp3212/chessdaddy/issues)
- Check existing issues for solutions

## Credits

- **Stockfish**: [stockfishchess.org](https://stockfishchess.org)
- **Chess.js**: Chess game validation library
- **Electron**: Desktop application framework
- **React**: UI framework

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-07  
**Maintainer**: typp3212
