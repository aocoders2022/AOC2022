import { crateMover9000, crateMover9001, findTopCrates, performMoves } from "@/05/05"
import { readFileSync } from "fs"
import { resolve } from "path"
import {
    addIndex,
    collectBy,
    isEmpty,
    juxt,
    map,
    nth,
    pipe,
    prop,
    propSatisfies,
    reject,
    replace,
    slice,
    split,
    splitEvery,
    trim,
    unnest,
} from "ramda"

const parseStacks = pipe(
    nth(0),
    split("\n"),
    slice(0, -1),
    map(
        pipe(
            replace(/\[|\]/g, " "),
            splitEvery(4),
            map(trim),
            addIndex(map)(Array),
            reject(propSatisfies(isEmpty, 0))
        )
    ),
    unnest,
    collectBy(prop(1)),
    map(map(prop(0)))
)

const parseMoves = pipe(
    nth(1),
    split("\n"),
    map(pipe(split(/[move ]|[ from ]|[ to ]/g), reject(isEmpty), map(Number)))
)

/* -------------------------------------------------------------------------- */

const [STACKS, MOVES] = juxt([parseStacks, parseMoves])(
    split("\n\n", String(readFileSync(resolve(__dirname, "05.input.txt"))))
)

describe("crateMover9000", () => {
    it("should return the stacks after moving with the CrateMover 9000", () => {
        expect(crateMover9000([1, 2, 1], [["N", "Z"], ["D", "C", "M"], ["P"]])).toEqual([
            ["D", "N", "Z"],
            ["C", "M"],
            ["P"],
        ])

        expect(crateMover9000([3, 1, 3], [["D", "N", "Z"], ["C", "M"], ["P"]])).toEqual([
            [],
            ["C", "M"],
            ["Z", "N", "D", "P"],
        ])

        expect(crateMover9000([2, 2, 1], [[], ["C", "M"], ["Z", "N", "D", "P"]])).toEqual([
            ["M", "C"],
            [],
            ["Z", "N", "D", "P"],
        ])

        expect(crateMover9000([1, 1, 2], [["M", "C"], [], ["Z", "N", "D", "P"]])).toEqual([
            ["C"],
            ["M"],
            ["Z", "N", "D", "P"],
        ])
    })
})

describe("crateMover9001", () => {
    it("should return the stacks after moving with the CrateMover 9001", () => {
        expect(crateMover9001([1, 2, 1], [["N", "Z"], ["D", "C", "M"], ["P"]])).toEqual([
            ["D", "N", "Z"],
            ["C", "M"],
            ["P"],
        ])

        expect(crateMover9001([3, 1, 3], [["D", "N", "Z"], ["C", "M"], ["P"]])).toEqual([
            [],
            ["C", "M"],
            ["D", "N", "Z", "P"],
        ])

        expect(crateMover9001([2, 2, 1], [[], ["C", "M"], ["D", "N", "Z", "P"]])).toEqual([
            ["C", "M"],
            [],
            ["D", "N", "Z", "P"],
        ])

        expect(crateMover9001([1, 1, 2], [["C", "M"], [], ["D", "N", "Z", "P"]])).toEqual([
            ["M"],
            ["C"],
            ["D", "N", "Z", "P"],
        ])
    })
})

describe("findTopCrates", () => {
    it("should return the top crates for each stack", () => {
        expect(findTopCrates([["C"], ["M"], ["Z", "N", "D", "P"]])).toEqual("CMZ")

        expect(findTopCrates(performMoves(MOVES, STACKS))).toEqual("MQSHJMWNH")

        expect(findTopCrates([["M"], ["C"], ["D", "N", "Z", "P"]])).toEqual("MCD")

        expect(findTopCrates(performMoves(MOVES, STACKS, crateMover9001))).toEqual("LLWJRBHVZ")
    })
})

describe("performMoves", () => {
    it("should perform the given moves on the given stacks", () => {
        expect(
            performMoves(
                [
                    [1, 2, 1],
                    [3, 1, 3],
                    [2, 2, 1],
                    [1, 1, 2],
                ],
                [["N", "Z"], ["D", "C", "M"], ["P"]]
            )
        ).toEqual([["C"], ["M"], ["Z", "N", "D", "P"]])

        expect(
            performMoves(
                [
                    [1, 2, 1],
                    [3, 1, 3],
                    [2, 2, 1],
                    [1, 1, 2],
                ],
                [["N", "Z"], ["D", "C", "M"], ["P"]],
                crateMover9001
            )
        ).toEqual([["M"], ["C"], ["D", "N", "Z", "P"]])
    })
})
