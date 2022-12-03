import { __, all, find, includes, map, pipe, split, sum, toUpper } from "ramda"

export const sumDuplicateItems = (lists: string[][]): number =>
    sum(
        map(
            pipe(
                ([rucksack = "", ...rucksacks]) =>
                    find((item) => all(includes(item), rucksacks), split("", rucksack)) || "",
                (item) => item.charCodeAt(0) - (toUpper(item) === item ? 38 : 96)
            ),
            lists
        )
    )
