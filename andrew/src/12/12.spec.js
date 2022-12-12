import {
    getCell,
    getCoordinates,
    getEndCoordinates,
    getNumericValue,
    getRow,
    getShortestPath,
    getShortestPathLength,
    getStartCoordinates,
    getSurroundingCoordinates,
} from "@/12/12"
import { readFileSync } from "fs"
import { resolve } from "path"

const parseInput = (input) => input.split("\n").map((line) => line.split(""))

const EXAMPLE = parseInput(String(readFileSync(resolve(__dirname, "12.example.txt"))))

const INPUT = parseInput(String(readFileSync(resolve(__dirname, "12.input.txt"))))

/* -------------------------------------------------------------------------- */

describe("getCell", () => {
    it("should return the cell", () => {
        expect(getCell([1, 1], EXAMPLE)).toEqual("b")
    })
})

describe("getCoordinates", () => {
    it("should return the coordinates of a value", () => {
        expect(getCoordinates("c", EXAMPLE)).toEqual([1, 2])
    })
})

describe("getEndCoordinates", () => {
    it("should return the coordinates of the end", () => {
        expect(getEndCoordinates(EXAMPLE)).toEqual([2, 5])
    })
})

describe("getNumericValue", () => {
    it("should return the numeric value of a letter", () => {
        expect(getNumericValue("a")).toEqual(1)
        expect(getNumericValue("z")).toEqual(26)
    })
})

describe("getRow", () => {
    it("should return the row", () => {
        expect(getRow([1], EXAMPLE)).toEqual(["a", "b", "c", "r", "y", "x", "x", "l"])
    })
})

describe("getShortestPath", () => {
    it("should return the shortest path", () => {
        expect(
            getShortestPath(getStartCoordinates(EXAMPLE), getEndCoordinates(EXAMPLE), EXAMPLE)
        ).toEqual([
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
            [2, 2],
            [3, 2],
            [4, 2],
            [4, 3],
            [4, 4],
            [4, 5],
            [4, 6],
            [4, 7],
            [3, 7],
            [2, 7],
            [1, 7],
            [0, 7],
            [0, 6],
            [0, 5],
            [0, 4],
            [0, 3],
            [1, 3],
            [2, 3],
            [3, 3],
            [3, 4],
            [3, 5],
            [3, 6],
            [2, 6],
            [1, 6],
            [1, 5],
            [1, 4],
            [2, 4],
            [2, 5],
        ])
    })
})

describe("getShortestPathLength", () => {
    it("should return the shortest path length", () => {
        expect(
            getShortestPathLength(getStartCoordinates(EXAMPLE), getEndCoordinates(EXAMPLE), EXAMPLE)
        ).toEqual(31)
    })
})

describe("getStartCoordinates", () => {
    it("should return the coordinates of the start", () => {
        expect(getStartCoordinates(EXAMPLE)).toEqual([0, 0])
    })
})

describe("getSurroundingCoordinates", () => {
    it("should return the surrounding coordinates", () => {
        expect(getSurroundingCoordinates([1, 1])).toEqual([
            [0, 1],
            [1, 0],
            [1, 2],
            [2, 1],
        ])
    })
})
