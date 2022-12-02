import { sum } from "@/tools"

describe("sum", () => {
    it("should return the sum of the given list of numbers", () => {
        expect(sum([1000, 2000, 3000])).toEqual(6000)

        expect(sum([4000])).toEqual(4000)

        expect(sum([5000, 6000])).toEqual(11000)

        expect(sum([7000, 8000, 9000])).toEqual(24000)

        expect(sum([10000])).toEqual(10000)
    })
})
