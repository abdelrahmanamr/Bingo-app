import React, { useEffect, useState } from "react";
import BingoBoard from "./components/BingoBoard";
import BingoWinModal from "./components/BingoWinModal";
import { shuffleArray } from "./utils/shuffle";
import { checkWin } from "./utils/checkWin";

const SIZE = 5;
const CENTER = 2;

const phrases: string[] = [
  "Slept in past 10AM",
  "Made pancakes or waffles",
  "Watched a movie",
  "Cleaned the kitchen",
  "Took a nap",
  "Went for a walk",
  "Ordered takeout",
  "Read a book",
  "Binge-watched a series",
  "Did laundry",
  "Called a friend or family",
  "Tried a new recipe",
  "Did something creative",
  "Skipped a shower 😅",
  "Bought something online",
  "Listened to music",
  "Decluttered a drawer",
  "Went to the gym",
  "Had a self-care moment",
  "Posted on social media",
  "Played a board/video game",
  "Did absolutely nothing 🙃",
  "Went grocery shopping",
  "Spent time outside",
  "Made a to-do list",
];

const App: React.FC = () => {
  const [board, setBoard] = useState<boolean[][]>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(false))
  );
  const [labels, setLabels] = useState<string[][]>([]);
  const [bingo, setBingo] = useState<boolean>(false);
  const [winningCells, setWinningCells] = useState<
    { row: number; col: number }[]
  >([]);

  useEffect(() => {
    const shuffled = shuffleArray(phrases);
    const tempLabels: string[][] = [];
    let index = 0;

    for (let i = 0; i < SIZE; i++) {
      const row: string[] = [];
      for (let j = 0; j < SIZE; j++) {
        row.push(shuffled[index++]);
      }
      tempLabels.push(row);
    }

    const initialBoard = Array.from({ length: SIZE }, () =>
      Array(SIZE).fill(false)
    );
    initialBoard[CENTER][CENTER] = true;

    setLabels(tempLabels);
    setBoard(initialBoard);
  }, []);

  const toggleCell = (i: number, j: number) => {
    if (i === CENTER && j === CENTER) return;

    const newBoard = board.map((row, r) =>
      row.map((cell, c) => (r === i && c === j ? !cell : cell))
    );

    setBoard(newBoard);
    const result = checkWin(newBoard);
    setBingo(result.isWin);
    setWinningCells(result.winningCells);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 bg-[url(images/weekendImage.jpg)] bg-no-repeat bg-cover bg-center ">
      <h1 className="text-3xl font-bold mb-4">Weekend Bingo</h1>
      <BingoBoard
        labels={labels}
        board={board}
        onCellClick={toggleCell}
        winningCells={winningCells}
      />
      {bingo && <BingoWinModal winCount={winningCells.length} />}
    </div>
  );
};

export default App;
