import { render, screen, fireEvent } from "@testing-library/react";
import Cell from "../Cell";

describe("Cell component", () => {
  it("renders the label", () => {
    render(
      <Cell
        label="Hiking"
        marked={false}
        isWinning={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText("Hiking")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Cell
        label="Movie Night"
        marked={false}
        isWinning={false}
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText("Movie Night"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has correct class when unmarked", () => {
    render(
      <Cell
        label="Reading"
        marked={false}
        isWinning={false}
        onClick={() => {}}
      />
    );
    const cell = screen.getByText("Reading").parentElement;
    expect(cell).toHaveClass("bg-white");
  });

  it("has correct class when marked but not winning", () => {
    render(
      <Cell
        label="Cooking"
        marked={true}
        isWinning={false}
        onClick={() => {}}
      />
    );
    const cell = screen.getByText("Cooking").parentElement;
    expect(cell).toHaveClass("bg-green-500");
  });

  it("has correct class when marked and winning", () => {
    render(
      <Cell label="Gaming" marked={true} isWinning={true} onClick={() => {}} />
    );
    const cell = screen.getByText("Gaming").parentElement;
    expect(cell).toHaveClass("bg-yellow-400");
    expect(cell).toHaveClass("scale-105");
  });
});
