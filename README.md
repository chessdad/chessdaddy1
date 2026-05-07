# ChessDaddy - Complete Chess Analysis Application

## ✨ Features

### Core Features
- **Stockfish 18 Integration** - Local, offline chess engine analysis
- **Interactive Analysis Board** - Full-featured chessboard with animations
- **PGN Support** - Import and analyze complete games
- **Chess.com Integration** - Fetch and analyze your public games
- **Move Classification** - Brilliant, Great, Best, Good, Inaccuracy, Mistake, Blunder
- **Puzzle System** - Infinite puzzles with dynamic difficulty scaling
- **Opening Explorer** - Master game statistics for positions
- **Dark Mode** - Complete dark theme support
- **Fully Offline** - Works completely without internet after setup

---

## 📋 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| OS | Windows 10 64-bit | Windows 10/11 64-bit |
| RAM | 2GB | 4GB+ |
| Storage | 500MB | 1GB |
| CPU | Intel i5 | Intel i7+ |

---

## 🚀 Quick Start (5 Minutes)

### For Non-Technical Users

1. **Download & Install**
   - Go to [Releases](https://github.com/typp3212/chessdaddy/releases)
   - Download `ChessDaddy.exe`
   - Run the installer
   - Launch from Start Menu

**Done!** Everything is included.

### For Developers/Building from Source

See [INSTALLATION.md](./INSTALLATION.md) and [SETUP.md](./SETUP.md) for detailed instructions.

---

## 🎮 How to Use

### Analysis Board
1. Click "Analysis" in the sidebar
2. Click squares to move pieces
3. Engine automatically analyzes positions
4. Adjust analysis depth in settings
5. Import PGN files or paste FEN positions

### Chess.com Games
1. Click "My Games"
2. Enter your Chess.com username
3. Click "Fetch Games"
4. Select a game to analyze
5. View accuracy, move classifications, and statistics

### Puzzle Mode
1. Click "Puzzles"
2. Solve tactical puzzles
3. Difficulty scales based on your rating
4. Track your streak and accuracy
5. Puzzles include: Mate, Fork, Pin, Sacrifice, Defense

### Opening Explorer
1. Click "Openings"
2. Move pieces to explore opening statistics
3. See win rates from master games
4. Navigate through variations
5. Reset or undo to try different lines

### Settings
1. Click "Settings"
2. Toggle dark mode
3. Adjust engine analysis depth (10-30)
4. Configure board size
5. Enable/disable sound and animations

---

## 🏗️ Project Structure

```
chessdaddy/
├── public/
│   ├── electron.js              # Electron main process
│   ├── preload.js               # IPC bridge
│   ├── index.html               # HTML template
│   └── manifest.json            # PWA manifest
├── src/
│   ├── components/
│   │   ├── AnalysisBoard.tsx    # Main analysis interface
│   │   ├── Chessboard.tsx       # Playable board
│   │   ├── GameAnalyzer.tsx     # Chess.com integration
│   │   ├── PuzzleMode.tsx       # Puzzle system
│   │   ├── OpeningExplorer.tsx  # Opening statistics
│   │   ├── Settings.tsx         # User preferences
│   │   ├── Sidebar.tsx          # Navigation
│   │   └── ...
│   ├── services/
│   │   ├── StockfishWorker.ts   # Engine communication
│   │   ├── ChessComAPI.ts       # Chess.com API
│   │   ├── GameAnalyzer.ts      # Game analysis logic
│   │   ├── PuzzleSystem.ts      # Puzzle generation
│   │   ├── MoveClassifier.ts    # Move classification
│   │   ├── PGNParser.ts         # PGN parsing
│   │   ├── OpeningBook.ts       # Opening statistics
│   │   └── ...
│   ├── styles/
│   │   ├── index.css            # Global styles
│   │   ├── App.css              # App layout
│   │   └── *.css                # Component styles
│   ├── App.tsx                  # Main app component
│   └── index.tsx                # React entry point
├── engines/
│   └── stockfish.exe            # Chess engine (download separately)
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── README.md                    # This file
├── INSTALLATION.md              # Setup instructions
├── SETUP.md                     # Beginner guide
└── .gitignore
```

---

## 🛠️ Development

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org))
- Git ([Download](https://git-scm.com))
- Stockfish 18 ([Download](https://stockfishchess.org/download/))

### Setup

```bash
# Clone repository
git clone https://github.com/typp3212/chessdaddy.git
cd chessdaddy

# Install dependencies
npm install

# Add Stockfish
# 1. Download from stockfishchess.org
# 2. Extract stockfish.exe
# 3. Create engines/ folder
# 4. Copy stockfish.exe to engines/

# Start development
npm start

# Build for Windows
npm run build-exe
```

### Available Scripts

```bash
npm start              # Start dev server + Electron
npm run react-start    # React only (port 3000)
npm run react-build    # Build React app
npm run build-exe      # Create Windows .EXE
npm run electron-build # Build Electron app
```

---

## 📊 Move Classification System

Similar to Chess.com's analysis:

| Classification | Criteria |
|---|---|
| **Brilliant** | Surprising move with tactical advantage (often sacrifice) |
| **Great** | Excellent move, close to best |
| **Best** | Matches engine recommendation |
| **Good** | Solid move, close to best |
| **Inaccuracy** | Minor mistake (50-200 cp loss) |
| **Mistake** | Significant error (200-500 cp loss) |
| **Blunder** | Major blunder (500+ cp loss) |

---

## 🧩 Puzzle System

### Difficulty Scaling
- Start: 500-800 rating
- Progress: Difficulty increases with success
- Rating ranges: 500-3000 ELO
- Based on Lichess puzzle mechanics

### Themes
- **Mate** - Mating combinations
- **Fork** - Winning multiple pieces
- **Pin** - Exploiting pinned pieces
- **Skewer** - Reverse pin tactics
- **Sacrifice** - Material sacrifice for advantage
- **Defense** - Defensive tactics

---

## 🌐 API Integration

### Chess.com
- **No authentication required** - Uses public API
- **Endpoints**: `/pub/player/{username}/games`
- **Offline fallback**: No internet needed for other features

### Lichess Opening Book
- **Master game statistics**
- **Win/draw/loss rates**
- **Popularity metrics**
- **Cached locally** for performance

---

## 💾 Local Storage

All data stored locally in `~/.config/chessdaddy/`:
- Puzzle progress and ratings
- User preferences and settings
- Chess.com username
- Analysis history
- Game annotations

---

## ⚙️ Configuration

### Engine Settings
Edit `src/services/StockfishWorker.ts`:
```typescript
threads: 4              // CPU threads to use
hash: 256               // Hash table in MB
multiPV: 1              // Number of variations
analysisDepth: 20       // Default analysis depth
```

### Board Appearance
Edit `src/styles/Chessboard.css`:
```css
/* Light square color */
.square.light { background-color: #F0D9B5; }
/* Dark square color */
.square.dark { background-color: #B58863; }
```

---

## 🐛 Troubleshooting

### "Stockfish not found"
```bash
# Verify stockfish.exe exists
dir engines

# Should show: stockfish.exe
```

### "Module not found" errors
```bash
rm -r node_modules
npm cache clean --force
npm install
```

### App won't start
```bash
# Check terminal for errors
# Kill any stuck processes
taskkill /F /IM node.exe
taskkill /F /IM electron.exe

# Clear cache and restart
npm cache clean --force
npm start
```

### Chess.com games not loading
- Verify username spelling
- Ensure account has public games
- Check internet connection
- Wait 30 seconds for API response

---

## 📈 Performance

- **Engine depth**: Limited to 30 for responsiveness
- **Board rendering**: 60 FPS animations
- **Analysis**: Real-time as you play
- **Puzzle generation**: Cached locally
- **Memory usage**: ~200-400 MB

---

## 🔒 Privacy & Security

- **No cloud processing** - Everything runs locally
- **No data collection** - Your games stay private
- **Open source** - Audit the code anytime
- **Sandboxed** - Electron isolation enabled

---

## 🚀 Future Features

- [ ] Lichess.org integration
- [ ] PGN export with annotations
- [ ] Opening repertoire builder
- [ ] Endgame tablebase support
- [ ] Machine learning suggestions
- [ ] Online multiplayer
- [ ] Mobile companion app
- [ ] Custom engine support

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/typp3212/chessdaddy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/typp3212/chessdaddy/discussions)
- **Email**: Contact through GitHub

---

## 🙏 Credits

- **Stockfish**: [stockfishchess.org](https://stockfishchess.org) - Powerful chess engine
- **Chess.js**: Chess game validation and PGN parsing
- **Electron**: Desktop application framework
- **React**: UI framework
- **Lichess**: Opening book data and puzzle concepts

---

## 📝 Version History

### v1.0.0 (2026-05-07)
- Initial release
- Stockfish 18 integration
- Chess.com game analyzer
- Puzzle system with rating progression
- Opening explorer
- Dark mode support
- Complete offline functionality

---

**Made with ♥ by typp3212**

GitHub: [@typp3212](https://github.com/typp3212)  
Repository: [typp3212/chessdaddy](https://github.com/typp3212/chessdaddy)
