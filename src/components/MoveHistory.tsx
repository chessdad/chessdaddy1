import React from 'react';
import '../styles/MoveHistory.css';

interface MoveHistoryProps {
  moves: string[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  return (
    <div className="move-history">
      <h3>Move History</h3>
      <div className="moves-container">
        {moves.length === 0 ? (
          <p className="no-moves">No moves yet</p>
        ) : (
          moves.map((move, index) => (
            <span key={index} className="move">
              {Math.floor(index / 2) + 1}. {move}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default MoveHistory;