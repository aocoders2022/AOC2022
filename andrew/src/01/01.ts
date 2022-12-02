import { sort, sum } from "@/tools"

export const sumTopNCalories = (inventories: number[][], n: number = 1): number =>
    sum(sort(inventories.map(sum)).slice(-n))
