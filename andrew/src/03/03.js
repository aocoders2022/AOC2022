import { __, all, find, includes, map, pipe, split, splitAt, splitEvery, sum, toUpper } from "ramda"

export const calculateItemPriority = (item) =>
    item.charCodeAt(0) - (toUpper(item) === item ? 38 : 96)

export const findCommonItem = (list) => find(pipe(includes, all(__, list)), split("", list[0]))

export const separateRucksackCompartments = (rucksack) => splitAt(rucksack.length / 2, rucksack)

export const separateRucksackGroups = (rucksacks) => splitEvery(3, rucksacks)

export const sumCommonItemPriorities = (
    rucksacks,
    splitRucksacks = map(separateRucksackCompartments)
) => sum(map(pipe(findCommonItem, calculateItemPriority), splitRucksacks(rucksacks)))
