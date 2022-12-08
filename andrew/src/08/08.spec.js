import {
    calculateScenicScore,
    countVisibleTrees,
    findHighestScenicScore,
    getVisibleTrees,
} from "@/08/08"
import { readFileSync } from "fs"
import { resolve } from "path"
import { map, pipe, split } from "ramda"

const INPUT = map(
    pipe(split(""), map(Number)),
    split("\n", String(readFileSync(resolve(__dirname, "08.input.txt"))))
)

describe("findHighestScenicScore", () => {
    it("should return the highest scenic score", () => {
        expect(
            findHighestScenicScore([
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ])
        ).toEqual(8)

        expect(findHighestScenicScore(INPUT)).toEqual(479400)
    })
})

describe("calculateScenicScore", () => {
    it("should return the scenic score of a tree", () => {
        expect(
            calculateScenicScore(
                [1, 2],
                [
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ]
            )
        ).toEqual(4)

        expect(
            calculateScenicScore(
                [3, 2],
                [
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ]
            )
        ).toEqual(8)

        expect(
            calculateScenicScore(
                [0, 0],
                [
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ]
            )
        ).toEqual(0)

        expect(
            calculateScenicScore(
                [0, 4],
                [
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ]
            )
        ).toEqual(0)

        expect(
            calculateScenicScore(
                [4, 4],
                [
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ]
            )
        ).toEqual(0)

        expect(
            calculateScenicScore(
                [4, 0],
                [
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ]
            )
        ).toEqual(0)
    })
})

describe("getVisibleTrees", () => {
    it("should return all the visible trees for a grid", () => {
        expect(
            getVisibleTrees([
                [3, 0, 3, 7, 3],
                [2, 5, 5, 1, 2],
                [6, 5, 3, 3, 2],
                [3, 3, 5, 4, 9],
                [3, 5, 3, 9, 0],
            ])
        ).toEqual([3, 0, 3, 7, 3, 2, 5, 5, 2, 6, 5, 3, 2, 3, 5, 9, 3, 5, 3, 9, 0])
    })
})

describe("sumVisibleTrees", () => {
    it("should return the sum of the visible trees", () => {
        expect(
            countVisibleTrees([3, 0, 3, 7, 3, 2, 5, 5, 2, 6, 5, 3, 2, 3, 5, 9, 3, 5, 3, 9, 0])
        ).toEqual(21)

        expect(countVisibleTrees(getVisibleTrees(INPUT))).toEqual(1809)
    })
})
