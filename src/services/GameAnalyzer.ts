import { Chess } from 'chess.js';
import { StockfishWorker } from './StockfishWorker';

interface GameAnalysisResult {
  totalMoves: number;
  accuracy: number;
  bestMoveCount: number;
  greatMoveCount: number;
  goodMoveCount: number;
  inaccuracyCount: number;
  mistakeCount: number;
  blunderCount: number;
}

export class GameAnalyzer {
  private engine: StockfishWorker;

  constructor() {
    this.engine = new StockfishWorker();
  }

  async analyzeGame(
    pgn: string,
    depth: number = 20,
    onProgress?: (progress: number) => void
  ): Promise<GameAnalysisResult> {
    const chess = new Chess();
    
    const result: GameAnalysisResult = {
      totalMoves: 0,
      accuracy: 0,
      bestMoveCount: 0,
      greatMoveCount: 0,
      goodMoveCount: 0,
      inaccuracyCount: 0,
      mistakeCount: 0,
      blunderCount: 0
    };

    // Extract moves from PGN
    try {
      chess.loadPgn(pgn);
    } catch (e) {
      throw new Error('Invalid PGN format');
    }

    const moves = chess.moves({ verbose: true });
    result.totalMoves = moves.length;

    if (result.totalMoves === 0) {
      return result;
    }

    chess.reset();
    let moveCount = 0;

    for (const move of moves) {
      moveCount++;
      if (onProgress) {
        onProgress(moveCount / result.totalMoves);
      }

      try {
        chess.move(move);
        const fen = chess.fen();

        const evaluation = await this.engine.evaluatePosition(fen, depth);
        const bestMove = await this.engine.getBestMove(fen, depth);

        // Classify move quality based on evaluation difference
        if (move.san === bestMove) {
          result.bestMoveCount++;
        } else if (Math.abs(evaluation) < 50) {
          result.goodMoveCount++;
        } else if (Math.abs(evaluation) < 100) {
          result.inaccuracyCount++;
        } else if (Math.abs(evaluation) < 300) {
          result.mistakeCount++;
        } else {
          result.blunderCount++;
        }
      } catch (err) {
        console.error('Error analyzing move:', err);
      }
    }

    // Calculate accuracy
    const totalClassifiedMoves = 
      result.bestMoveCount + 
      result.greatMoveCount + 
      result.goodMoveCount + 
      result.inaccuracyCount + 
      result.mistakeCount + 
      result.blunderCount;

    if (totalClassifiedMoves > 0) {
      result.accuracy = Math.round(
        ((result.bestMoveCount + result.greatMoveCount) / totalClassifiedMoves) * 100
      );
    }

    return result;
  }
}