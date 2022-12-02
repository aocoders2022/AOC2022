import { sum } from "@/tools"

export const sumTopNCalories = (inventories: number[][], n: number = 1): number =>
    sum(
        inventories
            .map(sum)
            .sort((caloriesA, caloriesB) => caloriesA - caloriesB)
            .slice(-n)
    )
