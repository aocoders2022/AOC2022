export function solve1(input: string) {
  // A, X = Rock
  // B, Y = Paper
  // C, Z = Scissors

  const X = 1;
  const Y = 2;
  const Z = 3;

  const Win = 6;
  const Draw = 3;
  const Loss = 0;

  const scores = {
    "A X": X + Draw,
    "A Y": Y + Win,
    "A Z": Z + Loss,

    "B X": X + Loss,
    "B Y": Y + Draw,
    "B Z": Z + Win,

    "C X": X + Win,
    "C Y": Y + Loss,
    "C Z": Z + Draw,
  };

  return solve(input, scores);
}

export function solve2(input: string) {
  const A = 1; // Rock
  const B = 2; // Paper
  const C = 3; // Scissors

  const X = 0; // Loss
  const Y = 3; // Draw
  const Z = 6; // Win

  const scores = {
    "A X": X + C,
    "A Y": Y + A,
    "A Z": Z + B,

    "B X": X + A,
    "B Y": Y + B,
    "B Z": Z + C,

    "C X": X + B,
    "C Y": Y + C,
    "C Z": Z + A,
  };

  return solve(input, scores);
}

function solve(input: string, scores: Record<string, number>) {
  const rounds = input.split("\r\n");
  return rounds.reduce((sum, r) => sum + scores[r], 0);
}
