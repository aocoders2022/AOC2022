import { calculateTotalScore, followInstructions, guessInstructions } from "@/02/02"
import { readFileSync } from "fs"
import { resolve } from "path"
import { map, replace, split } from "ramda"

const INPUT = map(
    replace(" ", ""),
    split("\n", String(readFileSync(resolve(__dirname, "02.input.txt"))))
)

describe("calculateTotalScore", () => {
    it("should return the total score after the given rounds", () => {
        expect(calculateTotalScore(["AY", "BX", "CZ"])).toEqual(15)

        expect(calculateTotalScore(INPUT)).toEqual(15523)

        expect(calculateTotalScore(["AY", "BX", "CZ"], followInstructions)).toEqual(12)

        expect(calculateTotalScore(INPUT, followInstructions)).toEqual(15702)
    })
})

describe("followInstructions", () => {
    it("should return the score after following the instructions", () => {
        expect(followInstructions("AY")).toEqual(4)

        expect(followInstructions("BX")).toEqual(1)

        expect(followInstructions("CZ")).toEqual(7)
    })
})

describe("guessInstructions", () => {
    it("should return the score after guessing the instructions", () => {
        expect(guessInstructions("AY")).toEqual(8)

        expect(guessInstructions("BX")).toEqual(1)

        expect(guessInstructions("CZ")).toEqual(6)
    })
})
