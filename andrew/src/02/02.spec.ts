import { readFileSync } from "fs"
import { resolve } from "path"
import { calculateScore, followInstructions, guessInstructions, Round } from "@/02/02"

const INPUT = String(readFileSync(resolve(__dirname, "02.input.txt")))
    .split("\n")
    .map((line) => line.split(" ") as Round)

describe("calculateScore", () => {
    it("should return the final score after the given rounds", () => {
        expect(
            calculateScore([
                ["A", "Y"],
                ["B", "X"],
                ["C", "Z"],
            ])
        ).toEqual(15)

        expect(calculateScore(INPUT)).toEqual(15523)

        expect(
            calculateScore(
                [
                    ["A", "Y"],
                    ["B", "X"],
                    ["C", "Z"],
                ],
                followInstructions
            )
        ).toEqual(12)

        expect(calculateScore(INPUT, followInstructions)).toEqual(15702)
    })
})

describe("followInstructions", () => {
    it("should return the score after following the instructions", () => {
        expect(followInstructions(["A", "Y"])).toEqual(4)
        expect(followInstructions(["B", "X"])).toEqual(1)
        expect(followInstructions(["C", "Z"])).toEqual(7)
    })
})

describe("guessInstructions", () => {
    it("should return the score after guessing the instructions", () => {
        expect(guessInstructions(["A", "Y"])).toEqual(8)
        expect(guessInstructions(["B", "X"])).toEqual(1)
        expect(guessInstructions(["C", "Z"])).toEqual(6)
    })
})
