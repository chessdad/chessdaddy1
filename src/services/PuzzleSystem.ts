import { Chess } from 'chess.js';
import { StockfishWorker } from './StockfishWorker';

export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  difficulty: number;
}

export class PuzzleSystem {
  private engine: StockfishWorker;
  private puzzles: Puzzle[] = [];

  constructor() {
    this.engine = new StockfishWorker();
  }

  async initializePuzzles(): Promise<void> {
    // Load default puzzles
    this.puzzles = [
      {
        id: '1',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        solution: ['Bxc6', 'dxc6'],
        difficulty: 1
      }
    ];
  }

  getPuzzles(difficulty?: number): Puzzle[] {
    if (difficulty !== undefined) {
      return this.puzzles.filter(p => p.difficulty === difficulty);
    }
    return this.puzzles;
  }

  async validateSolution(fen: string, moves: string[]): Promise<boolean> {
    const chess = new Chess();
    
    try {
      chess.load(fen);
    } catch (e) {
      return false;
    }

    for (let i = 0; i < moves.length; i++) {
      const moveStr = moves[i];
      const move = chess.move(moveStr);

      if (!move) {
        return false;
      }
    }

    return true;
  }

  async generatePuzzle(fen: string, maxDepth: number = 15): Promise<Puzzle | null> {
    const chess = new Chess();
    
    try {
      chess.load(fen);
    } catch (e) {
      return null;
    }

    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) {
      return null;
    }

    const solution: string[] = [];
    let currentFen = fen;

    // Find a winning sequence
    for (let i = 0; i < Math.min(3, moves.length); i++) {
      try {
        chess.load(currentFen);
        const bestMove = await this.engine.getBestMove(currentFen, maxDepth);
        if (bestMove) {
          const move = chess.move(bestMove);
          if (move) {
            solution.push(bestMove);
            currentFen = chess.fen();
          }
        }
      } catch (e) {
        break;
      }
    }

    if (solution.length > 0) {
      return {
        id: `puzzle_${Date.now()}`,
        fen,
        solution,
        difficulty: 2
      };
    }

    return null;
  }
}