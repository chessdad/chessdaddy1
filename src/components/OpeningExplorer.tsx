import React, { useState } from 'react';
import '../styles/OpeningExplorer.css';
import Chessboard from './Chessboard';
import { BarChart3 } from 'lucide-react';

const OpeningExplorer: React.FC = () => {
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [stats, setStats] = useState({
    totalGames: 0,
    whiteWins: 0,
    draws: 0,
    blackWins: 0
  });

  return (
    <div className="opening-explorer">
      <div className="explorer-header">
        <h2>Opening Explorer</h2>
        <p>Explore opening statistics from master games</p>
      </div>

      <div className="explorer-container">
        <div className="explorer-board">
          <Chessboard fen={fen} readOnly={true} />
        </div>

        <div className="explorer-stats">
          <div className="stat-group">
            <h3>
              <BarChart3 size={20} />
              Statistics
            </h3>
            <div className="stat-items">
              <div className="stat-item">
                <span className="label">Total Games</span>
                <span className="value">{stats.totalGames}</span>
              </div>
              <div className="stat-item white">
                <span className="label">White Wins</span>
                <span className="value">{stats.whiteWins}</span>
              </div>
              <div className="stat-item draw">
                <span className="label">Draws</span>
                <span className="value">{stats.draws}</span>
              </div>
              <div className="stat-item black">
                <span className="label">Black Wins</span>
                <span className="value">{stats.blackWins}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningExplorer;
