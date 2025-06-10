import { describe, it, expect } from "vitest";
import { checkWin } from "../checkWin";

describe("checkWin", () => {
  const emptyBoard = Array(5)
    .fill(null)
    .map(() => Array(5).fill(false));

  it("returns no win for an empty board", () => {
    const result = checkWin(emptyBoard);
    expect(result.isWin).toBe(false);
    expect(result.winningCells).toHaveLength(0);
  });

  it("detects a winning row", () => {
    const board = emptyBoard.map((row) => [...row]);
    board[2] = Array(5).fill(true);

    const result = checkWin(board);
    expect(result.isWin).toBe(true);
    expect(result.winningCells).toHaveLength(5);
    expect(result.winningCells).toEqual([
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
    ]);
  });

  it("detects a winning column", () => {
    const board = emptyBoard.map((row) => [...row]);
    for (let i = 0; i < 5; i++) {
      board[i][1] = true;
    }

    const result = checkWin(board);
    expect(result.isWin).toBe(true);
    expect(result.winningCells).toHaveLength(5);
    expect(result.winningCells).toEqual([
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
      { row: 3, col: 1 },
      { row: 4, col: 1 },
    ]);
  });

  it("detects a winning \\ diagonal", () => {
    const board = emptyBoard.map((row) => [...row]);
    for (let i = 0; i < 5; i++) {
      board[i][i] = true;
    }

    const result = checkWin(board);
    expect(result.isWin).toBe(true);
    expect(result.winningCells).toHaveLength(5);
    expect(result.winningCells).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 2 },
      { row: 3, col: 3 },
      { row: 4, col: 4 },
    ]);
  });

  it("detects a winning / diagonal", () => {
    const board = emptyBoard.map((row) => [...row]);
    for (let i = 0; i < 5; i++) {
      board[i][4 - i] = true;
    }

    const result = checkWin(board);
    expect(result.isWin).toBe(true);
    expect(result.winningCells).toHaveLength(5);
    expect(result.winningCells).toEqual([
      { row: 0, col: 4 },
      { row: 1, col: 3 },
      { row: 2, col: 2 },
      { row: 3, col: 1 },
      { row: 4, col: 0 },
    ]);
  });

  it("handles multiple win paths and avoids duplicates", () => {
    const board = emptyBoard.map((row) => [...row]);
    for (let i = 0; i < 5; i++) {
      board[i][i] = true;
      board[i][4 - i] = true;
    }

    const result = checkWin(board);
    expect(result.isWin).toBe(true);
    // 9 unique winning cells: center is shared by both diagonals
    expect(result.winningCells).toHaveLength(9);
  });
});
