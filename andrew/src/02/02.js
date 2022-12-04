import { map, prop, sum } from "ramda"

export const calculateTotalScore = (rounds, applyInstructions = guessInstructions) =>
    sum(map(applyInstructions, rounds))

export const followInstructions = (round) =>
    prop(round, { AX: 3, AY: 4, AZ: 8, BX: 1, BY: 5, BZ: 9, CX: 2, CY: 6, CZ: 7 }) || 0

export const guessInstructions = (round) =>
    prop(round, { AX: 4, AY: 8, AZ: 3, BX: 1, BY: 5, BZ: 9, CX: 7, CY: 2, CZ: 6 }) || 0
