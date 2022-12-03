import { __, map, sum } from "ramda"

export const calculateScore = (rounds: string[], instructions: Record<string, number>): number =>
    sum(map((round) => instructions[round] || 0, rounds))
