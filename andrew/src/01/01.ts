export const countCalories = (inventory: number[]): number =>
    inventory.reduce((count, calories) => count + calories)

export const sumTopNCalorieCounts = (
    inventories: number[][],
    n: number = 1
): number =>
    countCalories(
        inventories
            .map(countCalories)
            .sort((caloriesA, caloriesB) => caloriesA - caloriesB)
            .slice(-n)
    )
