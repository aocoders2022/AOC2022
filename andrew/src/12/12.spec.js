import {
    getCell,
    getCoordinates,
    getEndCoordinates,
    getNumericValue,
    getRow,
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
