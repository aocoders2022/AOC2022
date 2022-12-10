import { completeCycle, completeProgram, findSignalStrength, sumSignalStrengths } from "@/10/10"
import { readFileSync } from "fs"
import { resolve } from "path"

const EXAMPLE = String(readFileSync(resolve(__dirname, "10.example.txt")))
    .split("\n")
    .map((line) => line.split(" "))
    .map(([action, value]) => ({
        action,
        value: typeof value === "string" ? Number(value) : value,
    }))

const INPUT = String(readFileSync(resolve(__dirname, "10.input.txt")))
    .split("\n")
    .map((line) => line.split(" "))
    .map(([action, value]) => ({
        action,
        value: typeof value === "string" ? Number(value) : value,
    }))

describe("completeCycle", () => {
    it("should return the completed cycle", () => {
        expect(completeCycle([1, { x: 1 }], { action: "noop", value: undefined })).toEqual([
            2,
            { x: 1 },
        ])

        expect(completeCycle([2, { x: 1 }], { action: "addx", value: 3 })).toEqual([4, { x: 4 }])

        expect(completeCycle([4, { x: 4 }], { action: "addx", value: -5 })).toEqual([6, { x: -1 }])
    })
})

describe("completeProgram", () => {
    it("should return the completed program", () => {
        expect(
            completeProgram(
                [
                    { action: "noop", value: undefined },
                    { action: "addx", value: 3 },
                    { action: "addx", value: -5 },
                ],
                [1, { x: 1 }]
            )
        ).toEqual([6, { x: -1 }])
    })
})

describe("findSignalStrength", () => {
    it("should return the signal strength", () => {
        expect(findSignalStrength(EXAMPLE, [1, { x: 1 }], 20)).toEqual(420)

        expect(findSignalStrength(EXAMPLE, [1, { x: 1 }], 60)).toEqual(1140)

        expect(findSignalStrength(EXAMPLE, [1, { x: 1 }], 100)).toEqual(1800)

        expect(findSignalStrength(EXAMPLE, [1, { x: 1 }], 140)).toEqual(2940)

        expect(findSignalStrength(EXAMPLE, [1, { x: 1 }], 180)).toEqual(2880)

        expect(findSignalStrength(EXAMPLE, [1, { x: 1 }], 220)).toEqual(3960)
    })
})

describe("sumSignalStrengths", () => {
    it("should return the sum of the signal strength", () => {
        expect(sumSignalStrengths(EXAMPLE, [1, { x: 1 }], [20, 60, 100, 140, 180, 220])).toEqual(
            13140
        )

        expect(sumSignalStrengths(INPUT, [1, { x: 1 }], [20, 60, 100, 140, 180, 220])).toEqual(
            15220
        )
    })
})
