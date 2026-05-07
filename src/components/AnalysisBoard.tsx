import React, { useState, useEffect } from 'react';
import '../styles/AnalysisBoard.css';
import Chessboard from './Chessboard';
import EngineEvaluation from './EngineEvaluation';
import MoveHistory from './MoveHistory';
import FENInput from './FENInput';
import FileUpload from './FileUpload';
import EvaluationBar from './EvaluationBar';
import { StockfishWorker } from '../services/StockfishWorker';
import { Chess } from 'chess.js';
import { PGNParser } from '../services/PGNParser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';

const AnalysisBoard: React.FC = () => {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [evaluation, setEvaluation] = useState<number>(0);
  const [bestMove, setBestMove] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [moveHistory, setMoveHistory] = useState<Array<{ from: string; to: string; san: string }>>([]);
  const [pgn, setPgn] = useState('');
  const [analysisDepth, setAnalysisDepth] = useState(20);
  const [engine] = useState(new StockfishWorker());

  useEffect(() => {
    engine.initialize();
    analyzePosition(chess.fen());
  }, []);

  const handleMove = (from: string, to: string) => {
    const newChess = new Chess(fen);
    const moveObj = newChess.move({
      from,
      to,
      promotion: 'q'
    });

    if (moveObj) {
      const newFen = newChess.fen();
      setChess(newChess);
      setFen(newFen);
      setMoveHistory([...moveHistory, { from, to, san: moveObj.san }]);
      analyzePosition(newFen);
    }
  };

  const handleUndo = () => {
    if (moveHistory.length === 0) return;

    const newChess = new Chess();
    const newHistory = moveHistory.slice(0, -1);

    for (const move of newHistory) {
      newChess.move({ from: move.from, to: move.to });
    }

    const newFen = newChess.fen();
    setChess(newChess);
    setFen(newFen);
    setMoveHistory(newHistory);
    analyzePosition(newFen);
  };

  const handleRedo = () => {
    // TODO: Implement redo
  };

  const analyzePosition = async (position: string) => {
    setIsAnalyzing(true);
    try {
      const evalScore = await engine.evaluatePosition(position, analysisDepth);
      const best = await engine.getBestMove(position, analysisDepth);
      setEvaluation(evalScore);
      setBestMove(best);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFENChange = (newFen: string) => {
    try {
      const newChess = new Chess(newFen);
      setChess(newChess);
      setFen(newFen);
      setMoveHistory([]);
      analyzePosition(newFen);
    } catch (error) {
      alert('Invalid FEN');
    }
  };

  const handlePGNUpload = (content: string) => {
    try {
      const parsed = PGNParser.parseGame(content);
      const newChess = new Chess();

      for (const moveObj of parsed.moves) {
        newChess.move(moveObj);
      }

      const newFen = newChess.fen();
      setChess(newChess);
      setFen(newFen);
      setMoveHistory(parsed.moves);
      setPgn(content);
      analyzePosition(newFen);
    } catch (error) {
      alert('Error parsing PGN: ' + String(error));
    }
  };

  const handleClearBoard = () => {
    const newChess = new Chess();
    setChess(newChess);
    setFen(newChess.fen());
    setMoveHistory([]);
    setEvaluation(0);
    setBestMove(null);
    analyzePosition(newChess.fen());
  };

  const handleStartPosition = () => {
    handleFENChange('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  };

  const handleDepthChange = (newDepth: number) => {
    setAnalysisDepth(newDepth);
    analyzePosition(fen);
  };

  return (
    <div className="analysis-board-container">
      <div className="board-section">
        <Chessboard fen={fen} onMove={handleMove} />
        <div className="board-controls">
          <button onClick={handleUndo} disabled={moveHistory.length === 0} className="control-btn">
            ↶ Undo
          </button>
          <button onClick={handleStartPosition} className="control-btn">
            ⟲ Start
          </button>
          <button onClick={handleClearBoard} className="control-btn">
            Clear
          </button>
        </div>
      </div>

      <div className="analysis-section">
        <Tabs defaultValue="analysis">
          <TabsList>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="pgn">PGN</TabsTrigger>
            <TabsTrigger value="fen">FEN</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
            <EngineEvaluation
              evaluation={evaluation}
              bestMove={bestMove}
              isAnalyzing={isAnalyzing}
            />
            <EvaluationBar whiteEval={evaluation} blackEval={-evaluation} />
            <div className="depth-control">
              <label htmlFor="depth">Analysis Depth: {analysisDepth}</label>
              <input
                id="depth"
                type="range"
                min="10"
                max="30"
                value={analysisDepth}
                onChange={(e) => handleDepthChange(Number(e.target.value))}
              />
            </div>
            <MoveHistory moves={moveHistory.map(m => m.san)} />
          </TabsContent>

          <TabsContent value="pgn">
            <div className="pgn-section">
              <h3>Import PGN</h3>
              <FileUpload onFileSelect={handlePGNUpload} />
              <div className="pgn-text-area">
                <textarea
                  value={pgn}
                  onChange={(e) => setPgn(e.target.value)}
                  placeholder="Paste PGN here or upload file"
                />
                <button
                  onClick={() => handlePGNUpload(pgn)}
                  className="primary-btn"
                >
                  Load PGN
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fen">
            <FENInput
              fen={fen}
              onFenChange={handleFENChange}
              onClearBoard={handleClearBoard}
              onStartPosition={handleStartPosition}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalysisBoard;