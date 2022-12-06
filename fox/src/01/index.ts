export function solve1(input: string) {
  const elves = input.split("\r\n\r\n");
  const totals = elves.map((e) =>
    e
      .split("\r\n")
      .map(Number)
      .reduce((total, x) => total + x, 0)
  );
  return totals.reduce((max, total) => Math.max(total, max), 0);
}

export function solve2(input: string) {
  const elves = input.split("\r\n\r\n");
  const totals = elves.map((e) =>
    e
      .split("\r\n")
      .map(Number)
      .reduce((total, x) => total + x, 0)
  );
  return totals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, x) => sum + x, 0);
}
