import { describe, expect, it } from "vitest";
import { solve1, solve2 } from ".";
import input from "./input.txt?raw";

describe("part 1", () => {
  it("solves part 1", () => {
    const solution = solve1(input);

    expect(solution).toBe(72240);
  });
});

describe("part 2", () => {
  it("solves part 2", () => {
    const solution = solve2(input);

    expect(solution).toBe(210957);
  });
});
