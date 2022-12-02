import { sum } from "@/tools"

export const calculateScore = (
    rounds: string[],
    applyInstructions: (round: string) => number = guessInstructions
): number => sum(rounds.map(applyInstructions))

export const followInstructions = (round: string): number =>
    ({ AX: 3, AY: 4, AZ: 8, BX: 1, BY: 5, BZ: 9, CX: 2, CY: 6, CZ: 7 }[round] || 0)

export const guessInstructions = (round: string): number =>
    ({ AX: 4, AY: 8, AZ: 3, BX: 1, BY: 5, BZ: 9, CX: 7, CY: 2, CZ: 6 }[round] || 0)
