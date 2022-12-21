import {
    applyDecryptionKey,
    getGroveCoordinates,
    mixFile,
    mixFileTimes,
    moveBackwards,
    moveForwards,
} from "@/20/20"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "20.input.txt")))
    .split("\n")
    .map(Number)

describe("applyDecryptionKey", () => {
    it("should return the new sequence with the decryption key applied", () => {
        expect(applyDecryptionKey([1, 2, -3, 3, -2, 0, 4])).toEqual([
            811589153, 1623178306, -2434767459, 2434767459, -1623178306, 0, 3246356612,
        ])
    })
})

describe("getGroveCoordinates", () => {
    it("should return the grove coordinates", () => {
        expect(getGroveCoordinates([1, 2, -3, 4, 0, 3, -2])).toEqual(3)

        expect(getGroveCoordinates(mixFile([1, 2, -3, 3, -2, 0, 4]))).toEqual(3)

        expect(getGroveCoordinates(mixFileTimes(1, [1, 2, -3, 3, -2, 0, 4]))).toEqual(3)

        expect(getGroveCoordinates(mixFile(INPUT))).toEqual(8372)

        expect(getGroveCoordinates(mixFileTimes(1, INPUT))).toEqual(8372)
    })
})

describe("mixFile", () => {
    it("should return the mixed file", () => {
        expect(mixFile([1, 2, -3, 3, -2, 0, 4])).toEqual([1, 2, -3, 4, 0, 3, -2])
    })
})

describe("mixFileTimes", () => {
    it("should return the mixed file a number of times", () => {
        expect(mixFileTimes(1, [1, 2, -3, 3, -2, 0, 4])).toEqual([1, 2, -3, 4, 0, 3, -2])

        // expect(
        //     mixFileTimes(
        //         10,
        //         [811589153, 1623178306, -2434767459, 2434767459, -1623178306, 0, 3246356612]
        //     )
        // ).toEqual(0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153)
    })
})

describe("moveBackwards", () => {
    it("should return the sequence with the number moved backwards", () => {
        // example from intro
        expect(moveBackwards([4, -2, 5, 6, 7, 8, 9], -2)).toEqual([4, 5, 6, 7, 8, -2, 9])

        expect(moveBackwards([1, -3, 2, 3, -2, 0, 4], -3)).toEqual([1, 2, 3, -2, -3, 0, 4])

        expect(moveBackwards([1, 2, -2, -3, 0, 3, 4], -2)).toEqual([1, 2, -3, 0, 3, 4, -2])

        expect(moveBackwards([1, -3, 2, 3, -2, 0, 4], -2)).toEqual([1, -3, -2, 2, 3, 0, 4])

        expect(moveBackwards([-6, 0, 0, 0, 0, 0, 0], -6)).toEqual([-6, 0, 0, 0, 0, 0, 0])

        expect(moveBackwards([-12, 0, 0, 0, 0, 0, 0], -12)).toEqual([-12, 0, 0, 0, 0, 0, 0])

        expect(moveBackwards([-24, 0, 0, 0, 0, 0, 0], -24)).toEqual([-24, 0, 0, 0, 0, 0, 0])
    })
})

describe("moveForwards", () => {
    it("should return the sequence with the number moved forwards", () => {
        // example from intro
        expect(moveForwards([4, 5, 6, 1, 7, 8, 9], 1)).toEqual([4, 5, 6, 7, 1, 8, 9])

        expect(moveForwards([1, 2, -3, 3, -2, 0, 4], 1)).toEqual([2, 1, -3, 3, -2, 0, 4])

        expect(moveForwards([2, 1, -3, 3, -2, 0, 4], 2)).toEqual([1, -3, 2, 3, -2, 0, 4])

        expect(moveForwards([1, 2, 3, -2, -3, 0, 4], 3)).toEqual([1, 2, -2, -3, 0, 3, 4])

        expect(moveForwards([1, 2, -3, 0, 3, 4, -2], 4)).toEqual([1, 2, -3, 4, 0, 3, -2])

        expect(moveForwards([8, 2, -3, 0, 3, 4, 1, -2], 1)).toEqual([1, 8, 2, -3, 0, 3, 4, -2])

        expect(moveForwards([6, 0, 0, 0, 0, 0, 0], 6)).toEqual([6, 0, 0, 0, 0, 0, 0])

        expect(moveForwards([12, 0, 0, 0, 0, 0, 0], 12)).toEqual([12, 0, 0, 0, 0, 0, 0])

        expect(moveForwards([24, 0, 0, 0, 0, 0, 0], 24)).toEqual([24, 0, 0, 0, 0, 0, 0])
    })
})
