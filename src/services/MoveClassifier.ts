export enum MoveType {
  BRILLIANT = 'brilliant',
  GREAT = 'great',
  BEST = 'best',
  GOOD = 'good',
  INACCURACY = 'inaccuracy',
  MISTAKE = 'mistake',
  BLUNDER = 'blunder',
  MISS = 'miss'
}

export interface MoveClassification {
  move: string;
  classification: MoveType;
  playerEval: number;
  bestEval: number;
  accuracy: number;
}

export class MoveClassifier {
  /**
   * Classify a move based on evaluation difference
   * Similar to Chess.com's move classification
   */
  public classify(
    playerEval: number,
    bestEval: number,
    isSacrifice: boolean = false
  ): MoveType {
    const diff = Math.abs(playerEval - bestEval);
    const accuracy = this.calculateAccuracy(diff);

    // Brilliant: Unexpected winning move, often involving sacrifice
    if (isSacrifice && bestEval > 500 && diff < 50) {
      return MoveType.BRILLIANT;
    }

    // Great: Excellent move, close to best
    if (diff < 15 && bestEval > 0) {
      return MoveType.GREAT;
    }

    // Best: Matches engine recommendation
    if (diff === 0) {
      return MoveType.BEST;
    }

    // Good: Solid move
    if (diff <= 50 && bestEval >= -100) {
      return MoveType.GOOD;
    }

    // Inaccuracy: Minor mistake
    if (50 < diff && diff <= 200) {
      return MoveType.INACCURACY;
    }

    // Mistake: Significant error
    if (200 < diff && diff <= 500) {
      return MoveType.MISTAKE;
    }

    // Blunder: Major blunder (evaluation loss > 500cp)
    if (diff > 500) {
      return MoveType.BLUNDER;
    }

    return MoveType.MISS;
  }

  /**
   * Calculate move accuracy percentage
   */
  public calculateAccuracy(evaluationDifference: number): number {
    // Cap at 100%
    return Math.max(0, 100 - evaluationDifference);
  }

  /**
   * Detect if a move is a sacrifice (material loss for positional/tactical advantage)
   */
  public isSacrifice(
    beforeEval: number,
    afterEval: number,
    materialDifference: number
  ): boolean {
    // Material loss but position improves
    return materialDifference > 0 && afterEval > beforeEval + 200;
  }
}
