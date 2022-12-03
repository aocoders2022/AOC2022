import { sumTopNCalories } from "@/01/01"
import { readFileSync } from "fs"
import { resolve } from "path"
import { map, pipe, split } from "ramda"

const INPUT = map(
    pipe(split("\n"), map(Number)),
    split("\n\n", String(readFileSync(resolve(__dirname, "01.input.txt"))))
)

describe("sumTopNCalories", () => {
    it("should return the sum of the top N calories", () => {
        expect(
            sumTopNCalories([[1000, 2000, 3000], [4000], [5000, 6000], [7000, 8000, 9000], [10000]])
        ).toEqual(24000)

        expect(sumTopNCalories(INPUT)).toEqual(70698)

        expect(
            sumTopNCalories(
                [[1000, 2000, 3000], [4000], [5000, 6000], [7000, 8000, 9000], [10000]],
                3
            )
        ).toEqual(45000)

        expect(sumTopNCalories(INPUT, 3)).toEqual(206643)
    })
})
