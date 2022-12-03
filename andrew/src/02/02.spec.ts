import { calculateScore } from "@/02/02"
import { readFileSync } from "fs"
import { resolve } from "path"
import { map, replace, split } from "ramda"

const INPUT = map(
    replace(" ", ""),
    split("\n", String(readFileSync(resolve(__dirname, "02.input.txt"))))
)

const GUESSED_INSTRUCTIONS = { AX: 4, AY: 8, AZ: 3, BX: 1, BY: 5, BZ: 9, CX: 7, CY: 2, CZ: 6 }

const INSTRUCTIONS = { AX: 3, AY: 4, AZ: 8, BX: 1, BY: 5, BZ: 9, CX: 2, CY: 6, CZ: 7 }

describe("calculateScore", () => {
    it("should return the score after the given rounds", () => {
        expect(calculateScore(["AY", "BX", "CZ"], GUESSED_INSTRUCTIONS)).toEqual(15)

        expect(calculateScore(INPUT, GUESSED_INSTRUCTIONS)).toEqual(15523)

        expect(calculateScore(["AY", "BX", "CZ"], INSTRUCTIONS)).toEqual(12)

        expect(calculateScore(INPUT, INSTRUCTIONS)).toEqual(15702)
    })
})
