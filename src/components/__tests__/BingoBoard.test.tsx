import { render, screen, fireEvent } from "@testing-library/react";
import BingoBoard from "../BingoBoard";
import { describe, it, expect, vi } from "vitest";

describe("BingoBoard", () => {
  const SIZE = 5;
  const mockLabels = Array.from({ length: SIZE }, (_, i) =>
    Array.from({ length: SIZE }, (_, j) => `Cell ${i}-${j}`)
  );

  const mockBoard = Array.from(
    { length: SIZE },
    (_, i) => Array.from({ length: SIZE }, (_, j) => i === j) // diagonals marked
  );

  const winningCells = [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
    { row: 3, col: 3 },
    { row: 4, col: 4 },
  ];

  it("renders a 5x5 grid of cells", () => {
    const handleClick = vi.fn();

    render(
      <BingoBoard
        labels={mockLabels}
        board={mockBoard}
        onCellClick={handleClick}
        winningCells={[]}
      />
    );

    const allCells = screen.getAllByText(/Cell \d-\d/);
    expect(allCells.length).toBe(25);
  });

  it("calls onCellClick when a cell is clicked", () => {
    const handleClick = vi.fn();

    render(
      <BingoBoard
        labels={mockLabels}
        board={mockBoard}
        onCellClick={handleClick}
        winningCells={[]}
      />
    );

    const cell = screen.getByText("Cell 0-0");
    fireEvent.click(cell);

    expect(handleClick).toHaveBeenCalledWith(0, 0);
  });

  it("applies winning style to winning cells", () => {
    const handleClick = vi.fn();

    render(
      <BingoBoard
        labels={mockLabels}
        board={mockBoard}
        onCellClick={handleClick}
        winningCells={winningCells}
      />
    );

    const winningCell = screen.getByText("Cell 0-0");
    expect(winningCell.parentElement?.className).toMatch(/bg-yellow-400/);
  });

  it("applies marked style to marked (non-winning) cells", () => {
    const handleClick = vi.fn();

    render(
      <BingoBoard
        labels={mockLabels}
        board={mockBoard}
        onCellClick={handleClick}
        winningCells={[]} // no winning cells
      />
    );

    const markedCell = screen.getByText("Cell 1-1");
    expect(markedCell.parentElement?.className).toMatch(/bg-green-500/);
  });
});
