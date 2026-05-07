import React, { useState, useEffect } from 'react';
import '../styles/OpeningExplorer.css';
import { ChevronDown } from 'lucide-react';
import { Chess } from 'chess.js';
import { OpeningBook } from '../services/OpeningBook';
import Chessboard from './Chessboard';

interface OpeningLine {
  name: string;
  moves: string[];
  frequency: number;
}

const OpeningExplorer: React.FC = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [openingLines, setOpeningLines] = useState<OpeningLine[]>([]);
  const [currentLine, setCurrentLine] = useState<string[]>([]);
  const [expandedLines, setExpandedLines] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadOpeningLines();
  }, []);

  const loadOpeningLines = () => {
    const lines = OpeningBook.getOpenings();
    setOpeningLines(lines);
  };

  const handleSelectLine = (line: OpeningLine) => {
    chess.reset();
    setCurrentLine([]);
    
    for (const moveStr of line.moves) {
      try {
        const move = chess.move(moveStr);
        if (move) {
          setCurrentLine([...currentLine, moveStr]);
        }
      } catch (e) {
        break;
      }
    }
    
    setFen(chess.fen());
  };

  const handleMove = (from: string, to: string) => {
    const moveObj = chess.move({ from, to });
    if (moveObj) {
      const newFen = chess.fen();
      setFen(newFen);
      setCurrentLine([...currentLine, moveObj.san]);
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

  return (
    <div className="opening-explorer">
      <div className="explorer-header">
        <h2>Opening Explorer</h2>
        <p>Explore popular opening lines</p>
      </div>

      <div className="explorer-content">
        <div className="board-section">
          <Chessboard fen={fen} onMove={handleMove} />
          <div className="move-list">
            <h4>Current Line:</h4>
            <p>{currentLine.join(' ')}</p>
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
                  <span className="line-frequency">({line.frequency})</span>
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