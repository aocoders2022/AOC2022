import { sort, sum } from "@/tools"

describe("sort", () => {
    it("should return the sorted array", () => {
        expect(sort([3000, 10000, 2000, 1000])).toEqual([1000, 2000, 3000, 10000])

        expect(sort(["z", "Z", "a", "A"])).toEqual(["A", "Z", "a", "z"])

        expect(sort(["z", "Z", "a", "A"], (a, b) => a.localeCompare(b))).toEqual([
            "a",
            "A",
            "z",
            "Z",
        ])
    })

    it("should not mutate the original array", () => {
        const array = [3000, 10000, 2000, 1000]

        sort(array)

        expect(array).toEqual([3000, 10000, 2000, 1000])
    })
})

describe("sum", () => {
    it("should return the sum of the given list of numbers", () => {
        expect(sum([1000, 2000, 3000])).toEqual(6000)

        expect(sum([4000])).toEqual(4000)

        expect(sum([5000, 6000])).toEqual(11000)

        expect(sum([7000, 8000, 9000])).toEqual(24000)

        expect(sum([10000])).toEqual(10000)
    })
})
