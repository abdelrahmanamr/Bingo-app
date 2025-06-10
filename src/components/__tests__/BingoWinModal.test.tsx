import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BingoModal from "../BingoWinModal";
import { act } from "react-dom/test-utils";

vi.mock("react-confetti", () => ({
  __esModule: true,
  default: () => <div data-testid="confetti-canvas" />,
}));

describe("BingoModal", () => {
  it("renders the bingo message", () => {
    render(<BingoModal winCount={1} />);
    expect(screen.getByText("🎉 BINGO! 🎉")).toBeInTheDocument();
  });

  it("should show confetti when winCount > 0", () => {
    render(<BingoModal winCount={2} />);
    const canvas = screen.getByTestId("confetti-canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("confetti key should increment on increased winCount", async () => {
    const { rerender } = render(<BingoModal winCount={1} />);
    const firstRenderConfetti = screen.getByTestId("confetti-canvas");

    act(() => {
      rerender(<BingoModal winCount={2} />);
    });

    const secondRenderConfetti = screen.getByTestId("confetti-canvas");

    expect(secondRenderConfetti).not.toBeNull();
    expect(secondRenderConfetti).not.toBe(firstRenderConfetti);
  });

  it("does not update confetti if winCount is not increased", async () => {
    const { rerender } = render(<BingoModal winCount={2} />);
    const firstKey = screen.getByTestId("confetti-canvas").getAttribute("key");

    rerender(<BingoModal winCount={2} />);
    const secondKey = screen.getByTestId("confetti-canvas").getAttribute("key");

    expect(firstKey).toBe(secondKey);
  });
});
