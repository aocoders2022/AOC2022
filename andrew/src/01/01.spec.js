import { sumTopNCalorieCounts } from "@/01/01"
import { readFileSync } from "fs"
import { resolve } from "path"
import { isEmpty, map, split, splitWhenever } from "ramda"

const INPUT = map(
    map(Number),
    splitWhenever(isEmpty, split("\n", String(readFileSync(resolve(__dirname, "01.input.txt")))))
)

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
