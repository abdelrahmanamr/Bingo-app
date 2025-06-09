interface WinningCells {
  isWin: boolean;
  winningCells: { row: number; col: number }[];
}

export const checkWin = (board: boolean[][]): WinningCells => {
  const SIZE = board.length;
  const winningCells: { row: number; col: number }[] = [];

  // Check rows
  for (let i = 0; i < SIZE; i++) {
    if (board[i].every((val) => val)) {
      for (let j = 0; j < SIZE; j++) {
        winningCells.push({ row: i, col: j });
      }
    }
  }

  // Check columns
  for (let i = 0; i < SIZE; i++) {
    if (board.map((row) => row[i]).every((val) => val)) {
      for (let j = 0; j < SIZE; j++) {
        winningCells.push({ row: j, col: i });
      }
    }
  }

  // Check diagonal \
  if ([0, 1, 2, 3, 4].every((i) => board[i][i])) {
    for (let i = 0; i < SIZE; i++) {
      winningCells.push({ row: i, col: i });
    }
  }

  // Check diagonal /
  if ([0, 1, 2, 3, 4].every((i) => board[i][SIZE - 1 - i])) {
    for (let i = 0; i < SIZE; i++) {
      winningCells.push({ row: i, col: SIZE - 1 - i });
    }
  }

  // Remove duplicates (in case a cell is part of multiple winning combinations)
  const uniqueWinningCells = winningCells.filter(
    (cell, index, self) =>
      index === self.findIndex((c) => c.row === cell.row && c.col === cell.col)
  );

  return {
    isWin: uniqueWinningCells.length > 0,
    winningCells: uniqueWinningCells,
  };
};
