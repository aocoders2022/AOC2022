import { applyDecryptionKey, getGroveCoordinates, mixFileTimes } from "@/20/20"
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
        expect(getGroveCoordinates(mixFileTimes(1, [1, 2, -3, 3, -2, 0, 4]))).toEqual(3)

        expect(getGroveCoordinates(mixFileTimes(1, INPUT))).toEqual(8372)

        expect(
            getGroveCoordinates(mixFileTimes(10, applyDecryptionKey([1, 2, -3, 3, -2, 0, 4])))
        ).toEqual(1623178306)

        expect(getGroveCoordinates(mixFileTimes(10, applyDecryptionKey(INPUT)))).toEqual(
            7865110481723
        )
    })
})

describe("mixFileTimes", () => {
    it("should return the mixed file a number of times", () => {
        expect(mixFileTimes(1, applyDecryptionKey([1, 2, -3, 3, -2, 0, 4]))).toEqual([
            0, -2434767459, 3246356612, -1623178306, 2434767459, 1623178306, 811589153,
        ])

        expect(mixFileTimes(2, applyDecryptionKey([1, 2, -3, 3, -2, 0, 4]))).toEqual([
            0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306, 811589153,
        ])

        expect(mixFileTimes(2, applyDecryptionKey([1, 2, -3, 3, -2, 0, 4]))).toEqual([
            0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306, 811589153,
        ])

        expect(mixFileTimes(5, applyDecryptionKey([1, 2, -3, 3, -2, 0, 4]))).toEqual([
            0, 811589153, -1623178306, 1623178306, -2434767459, 3246356612, 2434767459,
        ])

        expect(mixFileTimes(10, applyDecryptionKey([1, 2, -3, 3, -2, 0, 4]))).toEqual([
            0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153,
        ])
    })
})
