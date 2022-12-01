import { countCalories, sumTopNCalorieCounts } from "@/01/01"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "01.input.txt")))
    .split("\n\n")
    .map((block) => block.split("\n").map(Number))

describe("countCalories", () => {
    it("should return the calorie count", () => {
        expect(countCalories([1000, 2000, 3000])).toEqual(6000)

        expect(countCalories([4000])).toEqual(4000)

        expect(countCalories([5000, 6000])).toEqual(11000)

        expect(countCalories([7000, 8000, 9000])).toEqual(24000)

        expect(countCalories([10000])).toEqual(10000)
    })
})

describe("sumTopNCalorieCounts", () => {
    it("should return the sum of the top N calorie counts", () => {
        expect(
            sumTopNCalorieCounts([
                [1000, 2000, 3000],
                [4000],
                [5000, 6000],
                [7000, 8000, 9000],
                [10000],
            ])
        ).toEqual(24000)

        expect(sumTopNCalorieCounts(INPUT)).toEqual(70698)

        expect(
            sumTopNCalorieCounts(
                [[1000, 2000, 3000], [4000], [5000, 6000], [7000, 8000, 9000], [10000]],
                3
            )
        ).toEqual(45000)

        expect(sumTopNCalorieCounts(INPUT, 3)).toEqual(206643)
    })
})
