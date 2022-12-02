export type Round = ["A" | "B" | "C", "X" | "Y" | "Z"]

export const calculateTotalScore = (
    [round, ...rounds]: Round[],
    applyInstructions: ([abc, xyz]: Round) => number = guessInstructions
): number =>
    (round ? applyInstructions(round) : 0) +
    (rounds.length && calculateTotalScore(rounds, applyInstructions))

export const followInstructions = ([abc, xyz]: Round): number =>
    ["X", "Y", "Z"].indexOf(xyz) * 3 +
    { A: { X: 3, Y: 1, Z: 2 }, B: { X: 1, Y: 2, Z: 3 }, C: { X: 2, Y: 3, Z: 1 } }[abc][xyz]

export const guessInstructions = ([abc, xyz]: Round): number =>
    ["X", "Y", "Z"].indexOf(xyz) +
    1 +
    { A: { X: 3, Y: 6, Z: 0 }, B: { X: 0, Y: 3, Z: 6 }, C: { X: 6, Y: 0, Z: 3 } }[abc][xyz]
