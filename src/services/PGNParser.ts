import { Chess } from 'chess.js';

export interface ParsedGame {
  moves: Array<{ from: string; to: string; san: string; promotion?: string }>;
  result: string;
  white: string;
  black: string;
  event: string;
  site: string;
  date: string;
}

export class PGNParser {
  static parseGame(pgn: string): ParsedGame {
    const game: ParsedGame = {
      moves: [],
      result: '*',
      white: '?',
      black: '?',
      event: '?',
      site: '?',
      date: '?'
    };

    // Parse headers
    const headerRegex = /\[(\w+)\s+"([^"]*)"/g;
    let match;
    while ((match = headerRegex.exec(pgn)) !== null) {
      const [, key, value] = match;
      if (key === 'White') game.white = value;
      if (key === 'Black') game.black = value;
      if (key === 'Event') game.event = value;
      if (key === 'Site') game.site = value;
      if (key === 'Date') game.date = value;
      if (key === 'Result') game.result = value;
    }

    // Parse moves
    const chess = new Chess();
    const movesSection = pgn.replace(/\[.*?\]/gs, '').trim();
    const tokens = movesSection.split(/\s+/);

    for (const token of tokens) {
      // Skip move numbers, result markers, and comments
      if (/^\d+\./.test(token) || /^[01*]/.test(token) || token.startsWith('(') || token.startsWith('{')) {
        continue;
      }

      try {
        const move = chess.move(token, { strict: false });
        if (move) {
          game.moves.push({
            from: move.from,
            to: move.to,
            san: move.san,
            promotion: move.promotion
          });
        }
      } catch (e) {
        // Skip invalid tokens
        continue;
      }
    }

    return game;
  }

  static isValidPGN(pgn: string): boolean {
    const chess = new Chess();
    const movesSection = pgn.replace(/\[.*?\]/gs, '').trim();
    const tokens = movesSection.split(/\s+/);

    chess.reset();

    for (const token of tokens) {
      if (/^\d+\./.test(token) || /^[01*]/.test(token)) {
        continue;
      }

      try {
        const result = chess.move(token, { strict: false });
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
    let pgn = '';
    let moveNumber = 1;

    for (let i = 0; i < moves.length; i++) {
      if (i % 2 === 0) {
        pgn += `${moveNumber}. `;
      }
      pgn += moves[i] + ' ';
      if (i % 2 === 1) {
        moveNumber++;
      }
    }

    return pgn.trim();
  }
}