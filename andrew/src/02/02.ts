import { map, prop, sum } from "ramda"

export const calculateScore = (
    rounds: string[],
    applyInstructions: (round: string) => number = guessInstructions
): number => sum(map(applyInstructions, rounds))

export const followInstructions = (round: string): number =>
    prop(round, { AX: 3, AY: 4, AZ: 8, BX: 1, BY: 5, BZ: 9, CX: 2, CY: 6, CZ: 7 }) || 0

export const guessInstructions = (round: string): number =>
    prop(round, { AX: 4, AY: 8, AZ: 3, BX: 1, BY: 5, BZ: 9, CX: 7, CY: 2, CZ: 6 }) || 0
