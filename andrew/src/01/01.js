import { flip, map, sort, subtract, sum, take } from "ramda"

export const sumTopNCalorieCounts = (inventories, n = 1) =>
    sum(take(n, sort(flip(subtract), map(sum, inventories))))
