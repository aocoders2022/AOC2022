import { __, map, pipe, propOr, sum } from "ramda"

export const calculateScore = (rounds: string[], instructions: Record<string, number>): number =>
    sum(map(pipe(propOr(0, __, instructions), Number), rounds))
