import { map, slice, sort, subtract, sum } from "ramda"

export const sumTopNCalories = (inventories: number[][], n: number = 1): number =>
    sum(slice(-n, Infinity, sort(subtract, map(sum, inventories))))
