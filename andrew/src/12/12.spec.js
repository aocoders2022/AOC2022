import {
    getCell,
    getCoordinates,
    getEndCoordinates,
    getNumericValue,
    getRow,
    // getShortestPath,
    getShortestPathLength,
    getStartCoordinates,
    getSurroundingCoordinates,
    getSurroundingTraversableCoordinates,
    isTraversable,
    makeGrid,
    updateGrid,
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

        expect(getCell([-1, -1], EXAMPLE)).toEqual(null)

        expect(getCell([0, 0], [[0]])).toEqual(0)
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

        expect(getNumericValue("S")).toEqual(0)

        expect(getNumericValue("E")).toEqual(27)
    })
})

describe("getRow", () => {
    it("should return the row", () => {
        expect(getRow([1], EXAMPLE)).toEqual(["a", "b", "c", "r", "y", "x", "x", "l"])

        expect(getRow([-1], EXAMPLE)).toEqual(null)
    })
})

// describe("getShortestPath", () => {
//     it("should return the shortest path", () => {
//         expect(
//             getShortestPath(getStartCoordinates(EXAMPLE), getEndCoordinates(EXAMPLE), EXAMPLE)
//         ).toEqual([
//             [0, 0],
//             [1, 0],
//             [1, 1],
//             [2, 1],
//             [2, 2],
//             [3, 2],
//             [4, 2],
//             [4, 3],
//             [4, 4],
//             [4, 5],
//             [4, 6],
//             [4, 7],
//             [3, 7],
//             [2, 7],
//             [1, 7],
//             [0, 7],
//             [0, 6],
//             [0, 5],
//             [0, 4],
//             [0, 3],
//             [1, 3],
//             [2, 3],
//             [3, 3],
//             [3, 4],
//             [3, 5],
//             [3, 6],
//             [2, 6],
//             [1, 6],
//             [1, 5],
//             [1, 4],
//             [2, 4],
//             [2, 5],
//         ])
//     })
// })

describe("getShortestPathLength", () => {
    it("should return the shortest path length", () => {
        expect(
            getShortestPathLength(getStartCoordinates(EXAMPLE), getEndCoordinates(EXAMPLE), EXAMPLE)
        ).toEqual(31)

        // expect(
        //     getShortestPathLength(getStartCoordinates(INPUT), getEndCoordinates(INPUT), INPUT)
        // ).toEqual(31)
    })
})

describe("getStartCoordinates", () => {
    it("should return the coordinates of the start", () => {
        expect(getStartCoordinates(EXAMPLE)).toEqual([0, 0])
    })
})

describe("getSurroundingCoordinates", () => {
    it("should return the surrounding coordinates", () => {
        expect(getSurroundingCoordinates([1, 1], EXAMPLE)).toEqual([
            [0, 1],
            [1, 0],
            [1, 2],
            [2, 1],
        ])

        expect(getSurroundingCoordinates([0, 0], EXAMPLE)).toEqual([
            [0, 1],
            [1, 0],
        ])

        expect(getSurroundingCoordinates([0, 7], EXAMPLE)).toEqual([
            [0, 6],
            [1, 7],
        ])

        expect(getSurroundingCoordinates([4, 7], EXAMPLE)).toEqual([
            [3, 7],
            [4, 6],
        ])

        expect(getSurroundingCoordinates([4, 0], EXAMPLE)).toEqual([
            [3, 0],
            [4, 1],
        ])
    })
})

describe("getSurroundingTraversableCoordinates", () => {
    it("should return the surrounding traversable coordinates", () => {
        expect(getSurroundingTraversableCoordinates([1, 3], EXAMPLE)).toEqual([
            [0, 3],
            [1, 2],
            [2, 3],
        ])
    })
})

describe("isTraversable", () => {
    it("should return true when the path is traversable", () => {
        expect(isTraversable([0, 0], [0, 1], EXAMPLE)).toEqual(true)

        expect(isTraversable([2, 4], [2, 6], EXAMPLE)).toEqual(true)

        expect(isTraversable([0, 1], [0, 2], EXAMPLE)).toEqual(true)

        expect(isTraversable([0, 2], [0, 1], EXAMPLE)).toEqual(true)

        expect(isTraversable([0, 3], [0, 2], EXAMPLE)).toEqual(true)

        expect(isTraversable([1, 0], [2, 0], EXAMPLE)).toEqual(true)
    })

    it("should return false when the path is not traversable", () => {
        expect(isTraversable([2, 0], [2, 1], EXAMPLE)).toEqual(false)

        expect(isTraversable([0, 2], [0, 3], EXAMPLE)).toEqual(false)
    })
})

describe("makeGrid", () => {
    it("should return a new grid with the given size", () => {
        expect(makeGrid([3, 4])).toEqual([
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ])
    })
})

describe("updateGrid", () => {
    it("should return a new grid with the given value updated", () => {
        expect(
            updateGrid([1, 2], 1, [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
            ])
        ).toEqual([
            [null, null, null, null],
            [null, null, 1, null],
            [null, null, null, null],
        ])
    })
})
