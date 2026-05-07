import React, { useState, useEffect } from 'react';
import '../styles/PuzzleMode.css';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Chess } from 'chess.js';
import Chessboard from './Chessboard';

interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  difficulty: number;
  description: string;
}

const PuzzleMode: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([
    {
      id: '1',
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
      solution: ['b5c6', 'd7c6'],
      difficulty: 1,
      description: 'White sacrifices the bishop for two pawns'
    },
    {
      id: '2',
      fen: '6k1/5pp1/2b2n1p/1p2p3/3PP3/1BP2N2/PP3PPP/R2Q1RK1 w - - 0 1',
      solution: ['d4e5', 'f6e4'],
      difficulty: 2,
      description: 'Find the winning combination'
    }
  ]);

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [chess, setChess] = useState(new Chess(puzzles[0]?.fen || ''));
  const [fen, setFen] = useState(puzzles[0]?.fen || '');
  const [movesMade, setMovesMade] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  useEffect(() => {
    resetPuzzle();
  }, [currentPuzzleIndex]);

  const resetPuzzle = () => {
    const newChess = new Chess(currentPuzzle.fen);
    setChess(newChess);
    setFen(newChess.fen());
    setMovesMade([]);
    setSolved(false);
    setShowSolution(false);
  };

  const handleMove = (from: string, to: string) => {
    if (solved) return;

    const newChess = new Chess(fen);
    const move = newChess.move({ from, to, promotion: 'q' });

    if (move) {
      const newMoves = [...movesMade, move.san];
      setMovesMade(newMoves);
      setChess(newChess);
      setFen(newChess.fen());

      // Check if solved
      if (newMoves.length === currentPuzzle.solution.length) {
        const isSolved = newMoves.every(
          (m, i) => m === currentPuzzle.solution[i]
        );
        if (isSolved) {
          setSolved(true);
        }
      }
    }
  };

  const handleNextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
  };

  const handlePreviousPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(currentPuzzleIndex - 1);
    }
  };

  return (
    <div className="puzzle-mode">
      <div className="puzzle-header">
        <h2>Puzzle Mode</h2>
        <p>Puzzle {currentPuzzleIndex + 1} of {puzzles.length}</p>
      </div>

      <div className="puzzle-content">
        <div className="board-section">
          <Chessboard fen={fen} onMove={handleMove} disabled={solved} />
          <div className="puzzle-description">
            <p>{currentPuzzle.description}</p>
            <div className="difficulty">
              <span>Difficulty: {currentPuzzle.difficulty}/5</span>
            </div>
          </div>
        </div>

        <div className="puzzle-panel">
          <div className="puzzle-info">
            <h3>Moves Made: {movesMade.length}/{currentPuzzle.solution.length}</h3>
            <div className="move-sequence">
              {movesMade.map((m, i) => (
                <span key={i} className="move-badge">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {solved && (
            <div className="puzzle-result solved">
              <CheckCircle size={32} />
              <h4>Puzzle Solved!</h4>
              <p>Great job! You found the solution.</p>
            </div>
          )}

          {!solved && showSolution && (
            <div className="puzzle-solution">
              <h4>Solution:</h4>
              <p>{currentPuzzle.solution.join(' ')}</p>
            </div>
          )}

          <div className="puzzle-controls">
            <button onClick={resetPuzzle} className="btn-secondary">
              <RotateCcw size={18} />
              Reset
            </button>
            {!solved && (
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="btn-secondary"
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
            )}
          </div>

          <div className="puzzle-navigation">
            <button
              onClick={handlePreviousPuzzle}
              disabled={currentPuzzleIndex === 0}
              className="btn-nav"
            >
              Previous
            </button>
            <button
              onClick={handleNextPuzzle}
              disabled={currentPuzzleIndex === puzzles.length - 1}
              className="btn-nav"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleMode;