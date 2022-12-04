import {
    areRangesFullyOverlapping,
    areRangesPartiallyOverlapping,
    countOverlappingRanges,
} from "@/04/04"
import { readFileSync } from "fs"
import { resolve } from "path"
import { map, pipe, split } from "ramda"

const INPUT = map(
    pipe(split(","), map(pipe(split("-"), map(Number)))),
    split("\n", String(readFileSync(resolve(__dirname, "04.input.txt"))))
)

describe("areRangesFullyOverlapping", () => {
    it("should indicate whether the pair fully overlaps", () => {
        expect(
            areRangesFullyOverlapping([
                [2, 4],
                [6, 8],
            ])
        ).toEqual(false)

        expect(
            areRangesFullyOverlapping([
                [2, 3],
                [4, 5],
            ])
        ).toEqual(false)

        expect(
            areRangesFullyOverlapping([
                [5, 7],
                [7, 9],
            ])
        ).toEqual(false)

        expect(
            areRangesFullyOverlapping([
                [2, 8],
                [3, 7],
            ])
        ).toEqual(true)

        expect(
            areRangesFullyOverlapping([
                [6, 6],
                [4, 6],
            ])
        ).toEqual(true)

        expect(
            areRangesFullyOverlapping([
                [2, 6],
                [4, 8],
            ])
        ).toEqual(false)
    })
})

describe("areRangesPartiallyOverlapping", () => {
    it("should indicate whether the pair partially overlaps", () => {
        expect(
            areRangesPartiallyOverlapping([
                [2, 4],
                [6, 8],
            ])
        ).toEqual(false)

        expect(
            areRangesPartiallyOverlapping([
                [2, 3],
                [4, 5],
            ])
        ).toEqual(false)

        expect(
            areRangesPartiallyOverlapping([
                [5, 7],
                [7, 9],
            ])
        ).toEqual(true)

        expect(
            areRangesPartiallyOverlapping([
                [2, 8],
                [3, 7],
            ])
        ).toEqual(true)

        expect(
            areRangesPartiallyOverlapping([
                [6, 6],
                [4, 6],
            ])
        ).toEqual(true)

        expect(
            areRangesPartiallyOverlapping([
                [2, 6],
                [4, 8],
            ])
        ).toEqual(true)
    })
})

describe("countOverlappingRanges", () => {
    it("should return the number of ranges with an overlap", () => {
        expect(
            countOverlappingRanges([
                [
                    [2, 4],
                    [6, 8],
                ],
                [
                    [2, 3],
                    [4, 5],
                ],
                [
                    [5, 7],
                    [7, 9],
                ],
                [
                    [2, 8],
                    [3, 7],
                ],
                [
                    [6, 6],
                    [4, 6],
                ],
                [
                    [2, 6],
                    [4, 8],
                ],
            ])
        ).toEqual(2)

        expect(countOverlappingRanges(INPUT)).toEqual(515)

        expect(
            countOverlappingRanges(
                [
                    [
                        [2, 4],
                        [6, 8],
                    ],
                    [
                        [2, 3],
                        [4, 5],
                    ],
                    [
                        [5, 7],
                        [7, 9],
                    ],
                    [
                        [2, 8],
                        [3, 7],
                    ],
                    [
                        [6, 6],
                        [4, 6],
                    ],
                    [
                        [2, 6],
                        [4, 8],
                    ],
                ],
                areRangesPartiallyOverlapping
            )
        ).toEqual(4)

        expect(countOverlappingRanges(INPUT, areRangesPartiallyOverlapping)).toEqual(883)
    })
})
