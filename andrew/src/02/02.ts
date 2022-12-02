export type Round = ["A" | "B" | "C", "X" | "Y" | "Z"]

export const calculateTotalScore = (
    [round, ...rounds]: Round[],
    applyInstructions: ([abc, xyz]: Round) => number = guessInstructions
): number =>
    (round ? applyInstructions(round) : 0) +
    (rounds.length && calculateTotalScore(rounds, applyInstructions))

export const followInstructions = ([abc, xyz]: Round): number =>
    ({ AX: 3, AY: 4, AZ: 8, BX: 1, BY: 5, BZ: 9, CX: 2, CY: 6, CZ: 7 }[`${abc}${xyz}`])

export const guessInstructions = ([abc, xyz]: Round): number =>
    ({ AX: 4, AY: 8, AZ: 3, BX: 1, BY: 5, BZ: 9, CX: 7, CY: 2, CZ: 6 }[`${abc}${xyz}`])
