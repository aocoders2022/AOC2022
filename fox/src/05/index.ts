export function solve1(input: string, stacks: string[][]) {
  const moves = /move (\d+) from (\d+) to (\d+)/gm;

  while (true) {
    const move = moves.exec(input);
    if (!move) break;
    const [, n, si, sj] = move;

    for (let i = 0, len = Number(n); i < len; i++) {
      const top = stacks[Number(si) - 1].pop();
      if (top === undefined) break;
      stacks[Number(sj) - 1].push(top);
    }
  }

  return stacks.map((s) => s[s.length - 1] || "").join("");
}

export function solve2(input: string, stacks: string[][]) {
  const moves = /move (\d+) from (\d+) to (\d+)/gm;

  while (true) {
    const move = moves.exec(input);
    if (!move) break;

    const [, n, si, sj] = move;

    const crates = stacks[Number(si) - 1].splice(-n);
    stacks[Number(sj) - 1].push(...crates);
  }

  return stacks.map((s) => s[s.length - 1] || "").join("");
}
