import { isCorrectPacketOrder, countPaired } from "@/13/13"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "13.input.txt")))
    .split("\n\n")
    .map((pair) => pair.split("\n").map(eval))

const EXAMPLE = String(readFileSync(resolve(__dirname, "13.example.txt")))
    .split("\n\n")
    .map((pair) => pair.split("\n").map(eval))

describe("isCorrectPacketOrder", () => {
    it("should return true when the packets are in the correct order", () => {
        expect(isCorrectPacketOrder([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toEqual(true)

        expect(isCorrectPacketOrder([[1], [2, 3, 4]], [[1], 4])).toEqual(true)

        expect(isCorrectPacketOrder([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toEqual(true)

        expect(isCorrectPacketOrder([], [3])).toEqual(true)
    })

    it("should return false when the packets are not in the correct order", () => {
        expect(isCorrectPacketOrder([9], [[8, 7, 6]])).toEqual(false)

        expect(isCorrectPacketOrder([7, 7, 7, 7], [7, 7, 7])).toEqual(false)

        expect(isCorrectPacketOrder([[[]]], [[]])).toEqual(false)

        expect(
            isCorrectPacketOrder(
                [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
                [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
            )
        ).toEqual(false)
    })
})

describe("countPaired", () => {
    it("should return the pair count", () => {
        expect(countPaired(EXAMPLE)).toEqual(13)

        expect(countPaired(INPUT)).toEqual(5529)
    })
})
