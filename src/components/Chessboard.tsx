import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import '../styles/Chessboard.css';

interface ChessboardProps {
  fen: string;
  onMove: (from: string, to: string) => void;
  disabled?: boolean;
}

const Chessboard: React.FC<ChessboardProps> = ({ fen, onMove, disabled = false }) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [chess] = useState(new Chess());

  useEffect(() => {
    try {
      chess.load(fen);
    } catch (e) {
      console.error('Invalid FEN:', e);
    }
  }, [fen, chess]);

  const handleSquareClick = (square: string) => {
    if (disabled) return;

    try {
      chess.load(fen);
    } catch (e) {
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    if (selectedSquare) {
      try {
        const move = chess.move({
          from: selectedSquare,
          to: square,
          promotion: 'q'
        });

        if (move) {
          onMove(selectedSquare, square);
          setSelectedSquare(null);
          setLegalMoves([]);
          return;
        }
      } catch (e) {
        // Invalid move
      }
    }

    // Select new square and show legal moves
    const moves = chess.moves({ square, verbose: true });
    if (moves.length > 0) {
      setSelectedSquare(square);
      setLegalMoves(moves.map(m => m.to));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const renderBoard = () => {
    const squares = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    for (let i = 0; i < 64; i++) {
      const rank = Math.floor(i / 8);
      const file = i % 8;
      const square = files[file] + ranks[rank];
      const isLightSquare = (rank + file) % 2 === 0;
      const isSelected = selectedSquare === square;
      const isLegalMove = legalMoves.includes(square);

      const piece = chess.get(square);
      const pieceSymbol = piece ? getPieceUnicode(piece) : '';

      squares.push(
        <div
          key={square}
          className={`square ${isLightSquare ? 'light' : 'dark'} ${
            isSelected ? 'selected' : ''
          } ${isLegalMove ? 'legal-move' : ''}`}
          onClick={() => handleSquareClick(square)}
        >
          {isLegalMove && <div className="legal-move-indicator" />}
          {pieceSymbol && <span className="piece">{pieceSymbol}</span>}
        </div>
      );
    }

    return squares;
  };

  const getPieceUnicode = (piece: any) => {
    const symbols: { [key: string]: string } = {
      p: '♟',
      n: '♞',
      b: '♝',
      r: '♜',
      q: '♛',
      k: '♚',
      P: '♙',
      N: '♘',
      B: '♗',
      R: '♖',
      Q: '♕',
      K: '♔'
    };
    return symbols[piece.color === 'w' ? piece.type.toUpperCase() : piece.type];
  };

  return (
    <div className="chessboard">
      {renderBoard()}
    </div>
  );
};

export default Chessboard;