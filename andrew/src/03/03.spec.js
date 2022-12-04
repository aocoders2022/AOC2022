import {
    calculateItemPriority,
    findCommonItem,
    separateRucksackCompartments,
    separateRucksackGroups,
    sumCommonItemPriorities,
} from "@/03/03"
import { readFileSync } from "fs"
import { resolve } from "path"
import { split } from "ramda"

const INPUT = split("\n", String(readFileSync(resolve(__dirname, "03.input.txt"))))

describe("calculateItemPriority", () => {
    it("should return the priority value for the item", () => {
        expect(calculateItemPriority("p")).toEqual(16)

        expect(calculateItemPriority("L")).toEqual(38)

        expect(calculateItemPriority("P")).toEqual(42)

        expect(calculateItemPriority("v")).toEqual(22)

        expect(calculateItemPriority("t")).toEqual(20)

        expect(calculateItemPriority("s")).toEqual(19)

        expect(calculateItemPriority("r")).toEqual(18)

        expect(calculateItemPriority("Z")).toEqual(52)
    })
})

describe("findCommonItem", () => {
    it("should return the common item", () => {
        expect(findCommonItem(["vJrwpWtwJgWr", "hcsFMMfFFhFp"])).toEqual("p")

        expect(findCommonItem(["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"])).toEqual("L")

        expect(findCommonItem(["PmmdzqPrV", "vPwwTWBwg"])).toEqual("P")

        expect(findCommonItem(["wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn"])).toEqual("v")

        expect(findCommonItem(["ttgJtRGJ", "QctTZtZT"])).toEqual("t")

        expect(findCommonItem(["CrZsJsPPZsGz", "wwsLwLmpwMDw"])).toEqual("s")

        expect(
            findCommonItem([
                "vJrwpWtwJgWrhcsFMMfFFhFp",
                "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
                "PmmdzqPrVvPwwTWBwg",
            ])
        ).toEqual("r")

        expect(
            findCommonItem([
                "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
                "ttgJtRGJQctTZtZT",
                "CrZsJsPPZsGzwwsLwLmpwMDw",
            ])
        ).toEqual("Z")
    })
})

describe("separateRucksackCompartments", () => {
    it("should return the separated compartments for the given rucksack", () => {
        expect(separateRucksackCompartments("vJrwpWtwJgWrhcsFMMfFFhFp")).toEqual([
            "vJrwpWtwJgWr",
            "hcsFMMfFFhFp",
        ])

        expect(separateRucksackCompartments("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toEqual([
            "jqHRNqRjqzjGDLGL",
            "rsFMfFZSrLrFZsSL",
        ])

        expect(separateRucksackCompartments("PmmdzqPrVvPwwTWBwg")).toEqual([
            "PmmdzqPrV",
            "vPwwTWBwg",
        ])

        expect(separateRucksackCompartments("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn")).toEqual([
            "wMqvLMZHhHMvwLH",
            "jbvcjnnSBnvTQFn",
        ])

        expect(separateRucksackCompartments("ttgJtRGJQctTZtZT")).toEqual(["ttgJtRGJ", "QctTZtZT"])

        expect(separateRucksackCompartments("CrZsJsPPZsGzwwsLwLmpwMDw")).toEqual([
            "CrZsJsPPZsGz",
            "wwsLwLmpwMDw",
        ])
    })
})

describe("separateRucksackGroups", () => {
    it("should return the separated groups for the given rucksacks", () => {
        expect(
            separateRucksackGroups([
                "vJrwpWtwJgWrhcsFMMfFFhFp",
                "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
                "PmmdzqPrVvPwwTWBwg",
                "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
                "ttgJtRGJQctTZtZT",
                "CrZsJsPPZsGzwwsLwLmpwMDw",
            ])
        ).toEqual([
            ["vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg"],
            ["wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw"],
        ])
    })
})

describe("sumCommonItemPriorities", () => {
    it("should return the sum of the common item priorities in each rucksack", () => {
        expect(
            sumCommonItemPriorities([
                "vJrwpWtwJgWrhcsFMMfFFhFp",
                "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
                "PmmdzqPrVvPwwTWBwg",
                "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
                "ttgJtRGJQctTZtZT",
                "CrZsJsPPZsGzwwsLwLmpwMDw",
            ])
        ).toEqual(157)

        expect(sumCommonItemPriorities(INPUT)).toEqual(7597)

        expect(
            sumCommonItemPriorities(
                [
                    "vJrwpWtwJgWrhcsFMMfFFhFp",
                    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
                    "PmmdzqPrVvPwwTWBwg",
                    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
                    "ttgJtRGJQctTZtZT",
                    "CrZsJsPPZsGzwwsLwLmpwMDw",
                ],
                separateRucksackGroups
            )
        ).toEqual(70)

        expect(sumCommonItemPriorities(INPUT, separateRucksackGroups)).toEqual(2607)
    })
})
