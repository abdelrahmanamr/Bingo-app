import { useEffect, useState } from "react";
import React from "react";
import Confetti from "react-confetti";

interface BingoModalProps {
  winCount: number;
}

const BingoModal: React.FC<BingoModalProps> = ({ winCount }) => {
  const [confettiKey, setConfettiKey] = useState(0);
  const [previousWinCount, setPreviousWinCount] = useState(winCount || 0);

  useEffect(() => {
    if (winCount > 0 && winCount > previousWinCount) {
      setConfettiKey((prev) => prev + 1);
      setPreviousWinCount(winCount);
    } else {
      setPreviousWinCount(winCount);
    }
  }, [winCount]);

  return (
    <div>
      <div className="mt-6 p-4 bg-yellow-300 rounded-xl shadow-md text-center animate-bounce">
        <p className="text-xl font-bold">🎉 BINGO! 🎉</p>
      </div>
      <Confetti
        key={confettiKey}
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        tweenDuration={3000}
      />
    </div>
  );
};

export default BingoModal;
