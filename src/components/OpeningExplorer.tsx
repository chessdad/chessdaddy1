import React, { useState } from 'react';
import '../styles/OpeningExplorer.css';
import { ChevronDown } from 'lucide-react';
import { Chess } from 'chess.js';
import Chessboard from './Chessboard';

interface OpeningLine {
  name: string;
  moves: string[];
  frequency: number;
}

const OpeningExplorer: React.FC = () => {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [expandedLines, setExpandedLines] = useState<Set<number>>(new Set());

  const openingLines: OpeningLine[] = [
    { name: 'Italian Game', moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4'], frequency: 45 },
    { name: 'Ruy Lopez', moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1b5'], frequency: 52 },
    { name: 'Sicilian Defense', moves: ['e2e4', 'c7c5'], frequency: 78 },
    { name: 'French Defense', moves: ['e2e4', 'e7e6'], frequency: 34 },
    { name: 'Caro-Kann Defense', moves: ['e2e4', 'c7c6'], frequency: 42 },
    { name: 'Queens Gambit', moves: ['d2d4', 'd7d5', 'c2c4'], frequency: 67 }
  ];

  const handleSelectLine = (line: OpeningLine) => {
    const newChess = new Chess();
    const newMoves: string[] = [];

    for (const moveStr of line.moves) {
      try {
        const move = newChess.move(moveStr);
        if (move) {
          newMoves.push(move.san);
        }
      } catch (e) {
        break;
      }
    }

    setChess(newChess);
    setFen(newChess.fen());
    setMoveHistory(newMoves);
  };

  const handleMove = (from: string, to: string) => {
    const newChess = new Chess(fen);
    const move = newChess.move({ from, to, promotion: 'q' });

    if (move) {
      setChess(newChess);
      setFen(newChess.fen());
      setMoveHistory([...moveHistory, move.san]);
    }
  };

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedLines);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedLines(newExpanded);
  };

  const handleClearBoard = () => {
    const newChess = new Chess();
    setChess(newChess);
    setFen(newChess.fen());
    setMoveHistory([]);
  };

  return (
    <div className="opening-explorer">
      <div className="explorer-header">
        <h2>Opening Explorer</h2>
        <p>Explore popular opening lines</p>
      </div>

      <div className="explorer-content">
        <div className="board-section">
          <Chessboard fen={fen} onMove={handleMove} />
          <div className="controls">
            <button onClick={handleClearBoard} className="control-btn">
              Clear Board
            </button>
          </div>
          <div className="move-list">
            <h4>Current Line:</h4>
            <p>{moveHistory.join(' ')}</p>
          </div>
        </div>

        <div className="lines-section">
          <h3>Popular Openings</h3>
          <div className="opening-lines">
            {openingLines.map((line, index) => (
              <div key={index} className="opening-line-item">
                <div
                  className="line-header"
                  onClick={() => toggleExpanded(index)}
                >
                  <ChevronDown
                    size={18}
                    className={expandedLines.has(index) ? 'expanded' : ''}
                  />
                  <span className="line-name">{line.name}</span>
                  <span className="line-frequency">({line.frequency}%)</span>
                </div>
                {expandedLines.has(index) && (
                  <div className="line-details">
                    <p className="line-moves">{line.moves.join(' ')}</p>
                    <button
                      className="select-btn"
                      onClick={() => handleSelectLine(line)}
                    >
                      Load Opening
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningExplorer;