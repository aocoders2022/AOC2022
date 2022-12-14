import { isCorrectPacketOrder, countPaired, sortPackets, findDecoderKey } from "@/13/13"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "13.input.txt")))
    .split("\n\n")
    .map((pair) => pair.split("\n").map(eval))

const EXAMPLE = String(readFileSync(resolve(__dirname, "13.example.txt")))
    .split("\n\n")
    .map((pair) => pair.split("\n").map(eval))

const DIVIDERS = [[[6]], [[2]]]

const EXAMPLE_LIST = [
    ...DIVIDERS,
    ...String(readFileSync(resolve(__dirname, "13.example.txt")))
        .split("\n")
        .filter(Boolean)
        .map(eval),
]

const INPUT_LIST = [
    ...DIVIDERS,
    ...String(readFileSync(resolve(__dirname, "13.input.txt")))
        .split("\n")
        .filter(Boolean)
        .map(eval),
]

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

describe("sortPackets", () => {
    it("should sort the packets", () => {
        expect(sortPackets(EXAMPLE_LIST)).toEqual([
            [],
            [[]],
            [[[]]],
            [1, 1, 3, 1, 1],
            [1, 1, 5, 1, 1],
            [[1], [2, 3, 4]],
            [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
            [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
            [[1], 4],
            [[2]],
            [3],
            [[4, 4], 4, 4],
            [[4, 4], 4, 4, 4],
            [[6]],
            [7, 7, 7],
            [7, 7, 7, 7],
            [[8, 7, 6]],
            [9],
        ])
    })
})

describe("findDecoderKey", () => {
    it("should return the decoder key", () => {
        expect(findDecoderKey(EXAMPLE_LIST)).toEqual(140)

        expect(findDecoderKey(INPUT_LIST)).toEqual(27690)
    })
})
