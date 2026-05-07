import { Chess } from 'chess.js';

interface ParsedGame {
  moves: string[];
  result: string;
  white: string;
  black: string;
  event: string;
}

export class PGNParser {
  static parseGame(pgn: string): ParsedGame {
    const game: ParsedGame = {
      moves: [],
      result: '*',
      white: '?',
      black: '?',
      event: '?'
    };

    // Parse headers
    const headerRegex = /\[(\w+)\s+"([^"]*)"/g;
    let match;
    while ((match = headerRegex.exec(pgn)) !== null) {
      const [, key, value] = match;
      if (key === 'White') game.white = value;
      if (key === 'Black') game.black = value;
      if (key === 'Event') game.event = value;
      if (key === 'Result') game.result = value;
    }

    // Parse moves
    const movesSection = pgn.replace(/\[.*?\]/gs, '').trim();
    const tokens = movesSection.split(/\s+/);
    const chess = new Chess();

    for (const token of tokens) {
      // Skip move numbers and result markers
      if (/^\d+\./.test(token) || /^[01*-]/.test(token)) {
        continue;
      }

      try {
        const move = chess.move(token);
        if (move) {
          game.moves.push(`${move.from}${move.to}`);
        }
      } catch (e) {
        // Skip invalid tokens
        continue;
      }
    }

    return game;
  }

  static toAlgebraic(from: string, to: string, chess: Chess): string {
    try {
      const move = chess.move({ from, to, promotion: 'q' });
      if (move) {
        return move.san;
      }
    } catch (e) {
      // Ignore error
    }
    return `${from}${to}`;
  }

  static isValidPGN(pgn: string): boolean {
    const chess = new Chess();
    const movesSection = pgn.replace(/\[.*?\]/gs, '').trim();
    const tokens = movesSection.split(/\s+/);

    chess.reset();

    for (const move of tokens) {
      if (/^\d+\./.test(move) || /^[01*-]/.test(move)) {
        continue;
      }
      
      try {
        const result = chess.move(move);
        if (!result) {
          return false;
        }
      } catch (e) {
        return false;
      }
    }

    return true;
  }

  static toPGN(moves: string[]): string {
    const chess = new Chess();
    let pgn = '';
    let moveNumber = 1;

    for (let i = 0; i < moves.length; i++) {
      if (i % 2 === 0) {
        pgn += `${moveNumber}. `;
      }

      const move = chess.move(moves[i]);
      if (move) {
        pgn += `${move.san} `;
        if (i % 2 === 1) {
          moveNumber++;
        }
      }
    }

    return pgn.trim();
  }
}