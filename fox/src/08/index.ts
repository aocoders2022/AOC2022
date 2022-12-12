export function visibleFromTop(input: string[]) {
  const cols = input[0].length;
  const rows = input.length;
  const max = Array(cols).fill(-1);

  const trees: string[] = [];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const height = Number(input[r][c]);
      if (height > max[c]) {
        trees.push(`${c},${r}`);
        max[c] = height;
        if (height === 9) break;
      }
    }
  }

  return trees;
}

export function visibleFromBottom(input: string[]) {
  const cols = input[0].length;
  const rows = input.length;
  const max = Array(cols).fill(-1);

  const trees: string[] = [];

  for (let c = 0; c < cols; c++) {
    for (let r = rows; r--; ) {
      const height = Number(input[r][c]);
      if (height > max[c]) {
        trees.push(`${c},${r}`);
        max[c] = height;
        if (height === 9) break;
      }
    }
  }

  return trees;
}

export function visibleFromLeft(input: string[]) {
  const cols = input[0].length;
  const rows = input.length;
  const max = Array(rows).fill(-1);

  const trees: string[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const height = Number(input[r][c]);
      if (height > max[r]) {
        trees.push(`${c},${r}`);
        max[r] = height;
        if (height === 9) break;
      }
    }
  }

  return trees;
}

export function visibleFromRight(input: string[]) {
  const cols = input[0].length;
  const rows = input.length;
  const max = Array(rows).fill(-1);

  const trees: string[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = cols; c--; ) {
      const height = Number(input[r][c]);
      if (height > max[r]) {
        trees.push(`${c},${r}`);
        max[r] = height;
        if (height === 9) break;
      }
    }
  }

  return trees;
}

export function countVisibleTrees(input: string[]) {
  const trees = [
    ...visibleFromTop(input),
    ...visibleFromBottom(input),
    ...visibleFromLeft(input),
    ...visibleFromRight(input),
  ];
  const uniqueTrees = new Set(trees);
  return uniqueTrees.size;
}

export function getDistanceUp(
  input: string[],
  { x, y }: { x: number; y: number }
) {
  let distance = 0;
  const height = Number(input[y][x]);

  for (let r = y; r--; ) {
    const h = Number(input[r][x]);
    distance++;
    if (h >= height) break;
  }

  return distance;
}

export function getDistanceDown(
  input: string[],
  { x, y }: { x: number; y: number }
) {
  let distance = 0;
  const height = Number(input[y][x]);
  const rows = input.length;

  for (let r = y + 1; r < rows; r++) {
    const h = Number(input[r][x]);
    distance++;
    if (h >= height) break;
  }

  return distance;
}

export function getDistanceLeft(
  input: string[],
  { x, y }: { x: number; y: number }
) {
  let distance = 0;
  const height = Number(input[y][x]);

  for (let c = x; c--; ) {
    const h = Number(input[y][c]);
    distance++;
    if (h >= height) break;
  }

  return distance;
}

export function getDistanceRight(
  input: string[],
  { x, y }: { x: number; y: number }
) {
  let distance = 0;
  const height = Number(input[y][x]);
  const cols = input[0].length;

  for (let c = x + 1; c < cols; c++) {
    const h = Number(input[y][c]);
    distance++;
    if (h >= height) break;
  }

  return distance;
}

export function getScenicScore(
  input: string[],
  tree: { x: number; y: number }
) {
  return (
    getDistanceUp(input, tree) *
    getDistanceDown(input, tree) *
    getDistanceLeft(input, tree) *
    getDistanceRight(input, tree)
  );
}

export function getMaxScenicScore(input: string[]) {
  const cols = input[0].length;
  const rows = input.length;

  let max = 0;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const d =
        getDistanceUp(input, { x, y }) *
        getDistanceDown(input, { x, y }) *
        getDistanceLeft(input, { x, y }) *
        getDistanceRight(input, { x, y });
      if (d > max) max = d;
    }
  }

  return max;
}
