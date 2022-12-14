import { makeMap } from "@/14/14"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "14.input.txt"))).split("\n")

describe("makeMap", () => {
    it("should return a map of the cave", () => {
        expect(
            makeMap(["498,4 -> 498,6 -> 496,6", "503,4 -> 502,4 -> 502,9 -> 494,9"], "500,0")
        ).toEqual([
            [".", ".", ".", ".", ".", ".", "+", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", "#", ".", ".", ".", "#", "#"],
            [".", ".", ".", ".", "#", ".", ".", ".", "#", "."],
            [".", ".", "#", "#", "#", ".", ".", ".", "#", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
            ["#", "#", "#", "#", "#", "#", "#", "#", "#", "."],
        ])
    })
})