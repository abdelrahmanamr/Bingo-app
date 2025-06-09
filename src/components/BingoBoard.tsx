import React from "react";
import Cell from "./Cell";

interface BingoBoardProps {
  labels: string[][];
  board: boolean[][];
  onCellClick: (i: number, j: number) => void;
  winningCells: { row: number; col: number }[];
}

const BingoBoard: React.FC<BingoBoardProps> = ({
  labels,
  board,
  onCellClick,
  winningCells,
}) => (
  <div className="grid grid-cols-5 gap-2 w-full max-w-[600px] mx-auto p-2">
    {labels.map((row, i) =>
      row.map((label, j) => (
        <Cell
          key={`${i}-${j}`}
          label={label}
          marked={board[i][j]}
          isWinning={winningCells.some(
            (cell) => cell.row === i && cell.col === j
          )}
          onClick={() => onCellClick(i, j)}
        />
      ))
    )}
  </div>
);

export default BingoBoard;
