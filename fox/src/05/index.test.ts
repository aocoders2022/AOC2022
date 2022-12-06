import { describe, expect, it } from "vitest";
import { solve1, solve2 } from ".";
import input from "./input.txt?raw";

const makeStack = () => [
  ["M", "J", "C", "B", "F", "R", "L", "H"],
  ["Z", "C", "D"],
  ["H", "J", "F", "C", "N", "G", "W"],
  ["P", "J", "D", "M", "T", "S", "B"],
  ["N", "C", "D", "R", "J"],
  ["W", "L", "D", "Q", "P", "J", "G", "Z"],
  ["P", "Z", "T", "F", "R", "H"],
  ["L", "V", "M", "G"],
  ["C", "B", "G", "P", "F", "Q", "R", "J"],
];

describe("part 1", () => {
  it("solves part 1", () => {
    const solution = solve1(input, makeStack());

    expect(solution).toBe("TQRFCBSJJ");
  });
});

describe("part 2", () => {
  it("solves part 2", () => {
    const solution = solve2(input, makeStack());

    expect(solution).toBe("RMHFJNVFP");
  });
});
