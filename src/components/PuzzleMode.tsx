import React, { useState, useEffect } from 'react';
import '../styles/PuzzleMode.css';
import Chessboard from './Chessboard';
import { CheckCircle, XCircle, Zap } from 'lucide-react';

const PuzzleMode: React.FC = () => {
  const [puzzleRating, setPuzzleRating] = useState(800);
  const [solveCount, setSolveCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState({
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    solution: ['e2e4']
  });

  const handleMove = (from: string, to: string) => {
    const moveStr = `${from}${to}`;
    if (moveStr === currentPuzzle.solution[0]) {
      setStreak(streak + 1);
      setSolveCount(solveCount + 1);
      // Load next puzzle
      loadNextPuzzle();
    } else {
      setStreak(0);
    }
  };

  const loadNextPuzzle = () => {
    // In a real app, fetch from puzzle database
    setCurrentPuzzle({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      solution: ['e2e4']
    });
  };

  return (
    <div className="puzzle-mode">
      <div className="puzzle-header">
        <h2>Puzzle Rush</h2>
        <div className="stats-bar">
          <div className="stat">
            <Zap size={20} />
            <span>{streak} streak</span>
          </div>
          <div className="stat">
            <CheckCircle size={20} />
            <span>{solveCount} solved</span>
          </div>
          <div className="stat">
            <span className="rating">Rating: {puzzleRating}</span>
          </div>
        </div>
      </div>

      <div className="puzzle-container">
        <div className="puzzle-board">
          <Chessboard fen={currentPuzzle.fen} onMove={handleMove} />
        </div>
        <div className="puzzle-info">
          <h3>Find the best move</h3>
          <p className="difficulty-info">Puzzle Rating: {puzzleRating}</p>
          <button onClick={loadNextPuzzle} className="skip-btn">
            Skip Puzzle
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuzzleMode;
