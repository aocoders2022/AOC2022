export const countCalories = ([calories = 0, ...inventory]: number[]): number =>
    calories + (inventory.length && countCalories(inventory))

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
