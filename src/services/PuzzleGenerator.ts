import { Chess } from 'chess.js';
import { StockfishWorker } from './StockfishWorker';

export class PuzzleGenerator {
  static async generateFromPGN(pgn: string): Promise<string[]> {
    const chess = new Chess();
    const puzzles: string[] = [];

    try {
      chess.loadPgn(pgn);
      const moves = chess.moves({ verbose: true });

      // Analyze significant positions
      for (let i = 0; i < moves.length - 1; i++) {
        const move = moves[i];
        if (this.isSignificantMove(move)) {
          const position = chess.fen();
          puzzles.push(position);
        }
      }
    } catch (e) {
      console.error('Error generating puzzles from PGN:', e);
    }

    return puzzles;
  }

  private static isSignificantMove(move: any): boolean {
    // Consider moves significant if they involve captures or checks
    return move.capture !== undefined || move.check === true;
  }
}