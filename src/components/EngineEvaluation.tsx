import React from 'react';
import { Loader } from 'lucide-react';
import '../styles/EngineEvaluation.css';

interface EngineEvaluationProps {
  evaluation: number | null;
  bestMove: string | null;
  isAnalyzing: boolean;
}

const EngineEvaluation: React.FC<EngineEvaluationProps> = ({
  evaluation,
  bestMove,
  isAnalyzing
}) => {
  const formatEvaluation = (evalScore: number | null): string => {
    if (evalScore === null) return '0.00';
    const value = Math.abs(evalScore);
    if (value > 1000) {
      return evalScore > 0 ? `+M${Math.ceil(value / 100)}` : `-M${Math.ceil(value / 100)}`;
    }
    return ((evalScore) / 100).toFixed(2);
  };

  const getEvaluationColor = (evalScore: number | null): string => {
    if (evalScore === null) return '#888';
    if (evalScore > 300) return '#4CAF50';
    if (evalScore > 100) return '#8BC34A';
    if (evalScore < -300) return '#F44336';
    if (evalScore < -100) return '#FF9800';
    return '#FFC107';
  };

  return (
    <div className="engine-evaluation">
      <div className="evaluation-card">
        <h3>Engine Analysis</h3>
        <div className="evaluation-display">
          {isAnalyzing && <Loader className="spinner" size={20} />}
          <div className="eval-value">
            <span
              className="eval-number"
              style={{ color: getEvaluationColor(evaluation) }}
            >
              {formatEvaluation(evaluation)}
            </span>
          </div>
        </div>
        {bestMove && (
          <div className="best-move">
            <p className="best-move-label">Best Move:</p>
            <p className="best-move-value">{bestMove}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineEvaluation;