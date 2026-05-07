import { StockfishWorker } from './StockfishWorker';

export interface GameAnalysisResult {
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

    // Simulate analysis
    const lines = pgn.split('\n').length;
    result.totalMoves = Math.floor(Math.random() * 50) + 10;
    result.bestMoveCount = Math.floor(result.totalMoves * 0.4);
    result.goodMoveCount = Math.floor(result.totalMoves * 0.3);
    result.inaccuracyCount = Math.floor(result.totalMoves * 0.15);
    result.mistakeCount = Math.floor(result.totalMoves * 0.1);
    result.blunderCount = result.totalMoves - result.bestMoveCount - result.goodMoveCount - result.inaccuracyCount - result.mistakeCount;

    result.accuracy = Math.round(
      ((result.bestMoveCount + result.greatMoveCount) / result.totalMoves) * 100
    );

    if (onProgress) {
      onProgress(1);
    }

    return result;
  }
}