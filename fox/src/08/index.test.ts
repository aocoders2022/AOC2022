import { describe, expect, it } from "vitest";
import {
  countVisibleTrees,
  getDistanceDown,
  getDistanceLeft,
  getDistanceRight,
  getDistanceUp,
  getMaxScenicScore,
  getScenicScore,
  visibleFromBottom,
  visibleFromLeft,
  visibleFromRight,
  visibleFromTop,
} from ".";
import input from "./input.txt?raw";

// prettier-ignore
const sample = [
  "30373",  // 0
  "25512",  // 1
  "65332",  // 2
  "33549",  // 3
  "35390"]; // 4
// 01234

describe("part 1", () => {
  it("finds the trees that are visible from the top", () => {
    const trees = visibleFromTop(sample);
    expect(trees.sort()).toEqual(
      [
        "0,0",
        "0,2",
        "1,0",
        "1,1",
        "2,0",
        "2,1",
        "3,0",
        "3,4",
        "4,0",
        "4,3",
      ].sort()
    );
  });

  it("finds the trees that are visible from the bottom", () => {
    const trees = visibleFromBottom(sample);
    expect(trees.sort()).toEqual(
      ["0,4", "0,2", "1,4", "2,4", "2,3", "3,4", "4,4", "4,3"].sort()
    );
  });

  it("finds the trees that are visible from the left", () => {
    const trees = visibleFromLeft(sample);
    expect(trees.sort()).toEqual(
      [
        "0,0",
        "3,0",
        "0,1",
        "1,1",
        "0,2",
        "0,3",
        "2,3",
        "4,3",
        "0,4",
        "1,4",
        "3,4",
      ].sort()
    );
  });

  it("finds the trees that are visible from the right", () => {
    const trees = visibleFromRight(sample);
    expect(trees.sort()).toEqual(
      [
        "4,0",
        "3,0",
        "4,1",
        "2,1",
        "4,2",
        "3,2",
        "1,2",
        "0,2",
        "4,3",
        "4,4",
        "3,4",
      ].sort()
    );
  });

  it("finds the number of visible trees", () => {
    const count = countVisibleTrees(sample);
    expect(count).toBe(21);
  });

  it("solves part 1", () => {
    const solution = countVisibleTrees(input.split("\r\n"));

    expect(solution).toBe(1801);
  });
});

describe("part 2", () => {
  it.each([
    { tree: { x: 2, y: 1 }, distance: 1 },
    { tree: { x: 2, y: 3 }, distance: 2 },
  ])("finds the distance upwards", ({ tree, distance }) => {
    const computed = getDistanceUp(sample, tree);
    expect(computed).toBe(distance);
  });

  it.each([
    { tree: { x: 2, y: 1 }, distance: 2 },
    { tree: { x: 2, y: 3 }, distance: 1 },
  ])("finds the distance downwards", ({ tree, distance }) => {
    const computed = getDistanceDown(sample, tree);
    expect(computed).toBe(distance);
  });

  it.each([
    { tree: { x: 2, y: 1 }, distance: 1 },
    { tree: { x: 2, y: 3 }, distance: 2 },
  ])("finds the distance leftwards", ({ tree, distance }) => {
    const computed = getDistanceLeft(sample, tree);
    expect(computed).toBe(distance);
  });

  it.each([
    { tree: { x: 2, y: 1 }, distance: 2 },
    { tree: { x: 2, y: 3 }, distance: 2 },
  ])("finds the distance rightwards", ({ tree, distance }) => {
    const computed = getDistanceRight(sample, tree);
    expect(computed).toBe(distance);
  });

  it.each([
    { tree: { x: 2, y: 1 }, score: 4 },
    { tree: { x: 2, y: 3 }, score: 8 },
  ])("finds the scenic score", ({ tree, score }) => {
    const computed = getScenicScore(sample, tree);
    expect(computed).toBe(score);
  });

  it("finds the maximum scenic score", () => {
    const solution = getMaxScenicScore(sample);
    expect(solution).toBe(8);
  });

  it("solves part 2", () => {
    const solution = getMaxScenicScore(input.split("\r\n"));
    expect(solution).toBe(209880);
  });
});
