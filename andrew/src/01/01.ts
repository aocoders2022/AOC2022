import { map, slice, sort, subtract, sum } from "ramda"

export const sumTopNCalories = (inventories: number[][], n: number): number =>
    sum(slice(-n, Infinity, sort(subtract, map(sum, inventories))))
