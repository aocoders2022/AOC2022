import { sumDuplicateItems } from "@/03/03"
import { readFileSync } from "fs"
import { resolve } from "path"
import { map, splitAt, split, splitEvery } from "ramda"

const INPUT = split("\n", String(readFileSync(resolve(__dirname, "03.input.txt"))))

const RUCKSACKS = map((rucksack) => splitAt(rucksack.length / 2, rucksack), INPUT)

const GROUPS = splitEvery(3, INPUT)

describe("sumDuplicateItems", () => {
    it("should return the sum of the common items in each rucksack", () => {
        expect(
            sumDuplicateItems([
                ["vJrwpWtwJgWr", "hcsFMMfFFhFp"],
                ["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"],
                ["PmmdzqPrV", "vPwwTWBwg"],
                ["wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn"],
                ["ttgJtRGJ", "QctTZtZT"],
                ["CrZsJsPPZsGz", "wwsLwLmpwMDw"],
            ])
        ).toEqual(157)

        expect(sumDuplicateItems(RUCKSACKS)).toEqual(7597)

        expect(
            sumDuplicateItems([
                [
                    "vJrwpWtwJgWrhcsFMMfFFhFp",
                    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
                    "PmmdzqPrVvPwwTWBwg",
                ],
                ["wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw"],
            ])
        ).toEqual(70)

        expect(sumDuplicateItems(GROUPS)).toEqual(2607)
    })
})
