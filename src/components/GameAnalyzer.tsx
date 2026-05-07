import React, { useState } from 'react';
import '../styles/GameAnalyzer.css';
import { Upload, AlertCircle } from 'lucide-react';
import { ChessComAPI } from '../services/ChessComAPI';

interface GameAnalysis {
  accuracy: number;
  bestMoves: number;
  mistakes: number;
  blunders: number;
}

const GameAnalyzer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [analysis, setAnalysis] = useState<GameAnalysis | null>(null);

  const handleFetchGames = async () => {
    if (!username.trim()) {
      setError('Please enter a Chess.com username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const api = new ChessComAPI();
      const fetchedGames = await api.fetchUserGames(username);
      setGames(fetchedGames);
      localStorage.setItem('chesscomUsername', username);
    } catch (err) {
      setError('Failed to fetch games. Please check the username.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeGame = async (game: any) => {
    setSelectedGame(game);
    // In a real app, this would call the engine to analyze the game
    setAnalysis({
      accuracy: Math.floor(Math.random() * 100),
      bestMoves: Math.floor(Math.random() * 30),
      mistakes: Math.floor(Math.random() * 10),
      blunders: Math.floor(Math.random() * 5)
    });
  };

  return (
    <div className="game-analyzer">
      <div className="analyzer-header">
        <h2>Chess.com Game Analyzer</h2>
        <p>Analyze your Chess.com games with Stockfish</p>
      </div>

      <div className="username-input-section">
        <input
          type="text"
          placeholder="Enter Chess.com username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleFetchGames()}
        />
        <button onClick={handleFetchGames} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Games'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="games-grid">
        {games.map((game, index) => (
          <div
            key={index}
            className={`game-card ${selectedGame === game ? 'selected' : ''}`}
            onClick={() => handleAnalyzeGame(game)}
          >
            <div className="game-info">
              <p className="game-players">
                {game.white?.username} vs {game.black?.username}
              </p>
              <p className="game-result">Result: {game.white?.result || 'N/A'}</p>
            </div>
            <button className="analyze-btn">Analyze</button>
          </div>
        ))}
      </div>

      {selectedGame && analysis && (
        <div className="analysis-results">
          <h3>Game Analysis</h3>
          <div className="analysis-grid">
            <div className="analysis-card">
              <p className="label">Accuracy</p>
              <p className="value">{analysis.accuracy}%</p>
            </div>
            <div className="analysis-card">
              <p className="label">Best Moves</p>
              <p className="value">{analysis.bestMoves}</p>
            </div>
            <div className="analysis-card">
              <p className="label">Mistakes</p>
              <p className="value">{analysis.mistakes}</p>
            </div>
            <div className="analysis-card">
              <p className="label">Blunders</p>
              <p className="value">{analysis.blunders}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameAnalyzer;
