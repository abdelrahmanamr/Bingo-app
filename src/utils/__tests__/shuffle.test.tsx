import { shuffleArray } from "../shuffle";
describe("shuffleArray", () => {
  it("should return a new array with the same length as input", () => {
    const input = ["a", "b", "c", "d", "e"];
    const shuffled = shuffleArray(input);
    expect(shuffled).toHaveLength(input.length);
  });

  it("should contain all the original elements after shuffle", () => {
    const input = ["a", "b", "c", "d", "e"];
    const shuffled = shuffleArray(input);
    // Sort both arrays to compare content regardless of order
    expect(shuffled.slice().sort()).toEqual(input.slice().sort());
  });

  it("should not mutate the original array", () => {
    const input = ["a", "b", "c", "d", "e"];
    const inputCopy = [...input];
    shuffleArray(input);
    expect(input).toEqual(inputCopy);
  });

  it("should return an empty array if given an empty array", () => {
    const input: string[] = [];
    const shuffled = shuffleArray(input);
    expect(shuffled).toEqual([]);
  });

  it("should return the same array if given a single-element array", () => {
    const input = ["only"];
    const shuffled = shuffleArray(input);
    expect(shuffled).toEqual(["only"]);
  });

  it("should produce a different order on multiple calls (flaky test)", () => {
    const input = ["a", "b", "c", "d", "e"];
    const shuffled1 = shuffleArray(input);
    const shuffled2 = shuffleArray(input);
    expect(shuffled1).not.toEqual(shuffled2);
  });
});
