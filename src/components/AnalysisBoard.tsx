import React, { useState, useEffect } from 'react';
import '../styles/AnalysisBoard.css';
import Chessboard from './Chessboard';
import EngineEvaluation from './EngineEvaluation';
import MoveHistory from './MoveHistory';
import { ChessEngine } from '../services/ChessEngine';
import { Chess } from 'chess.js';

const AnalysisBoard: React.FC = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [evaluation, setEvaluation] = useState<number | null>(null);
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const engine = ChessEngine.getInstance();

  const handleMove = (sourceSquare: string, targetSquare: string) => {
    const moves = chess.moves({ verbose: true });
    const move = moves.find(
      (m) => m.from === sourceSquare && m.to === targetSquare
    );

    if (move) {
      chess.move(move);
      const newFen = chess.fen();
      setFen(newFen);
      setMoveHistory([...moveHistory, `${sourceSquare}${targetSquare}`]);
      analyzePosition(newFen);
    }
  };

  const analyzePosition = async (position: string) => {
    setIsAnalyzing(true);
    try {
      const result = await engine.analyze(position, 20);
      setEvaluation(result.evaluation);
      setBestMove(result.bestMove);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    analyzePosition(fen);
  }, []);

  return (
    <div className="analysis-board-container">
      <div className="board-section">
        <Chessboard fen={fen} onMove={handleMove} />
      </div>
      <div className="analysis-section">
        <EngineEvaluation
          evaluation={evaluation}
          bestMove={bestMove}
          isAnalyzing={isAnalyzing}
        />
        <MoveHistory moves={moveHistory} />
      </div>
    </div>
  );
};

export default AnalysisBoard;
