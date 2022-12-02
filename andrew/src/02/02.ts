export type Round = ["A" | "B" | "C", "X" | "Y" | "Z"]

export const calculateTotalScore = (
    [round, ...rounds]: Round[],
    applyInstructions: ([abc, xyz]: Round) => number = guessInstructions
): number =>
    (round ? applyInstructions(round) : 0) +
    (rounds.length && calculateTotalScore(rounds, applyInstructions))

export const followInstructions = ([abc, xyz]: Round): number =>
    ({ X: 0, Y: 3, Z: 6 }[xyz] +
    { AX: 3, AY: 1, AZ: 2, BX: 1, BY: 2, BZ: 3, CX: 2, CY: 3, CZ: 1 }[`${abc}${xyz}`])

export const guessInstructions = ([abc, xyz]: Round): number =>
    ({ X: 1, Y: 2, Z: 3 }[xyz] +
    { AX: 3, AY: 6, AZ: 0, BX: 0, BY: 3, BZ: 6, CX: 6, CY: 0, CZ: 3 }[`${abc}${xyz}`])
