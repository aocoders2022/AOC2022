export const countUnconnectedSurfaces = (plottedDropletScan) =>
    Array.from(plottedDropletScan)
        .map((xyz) => xyz.split(",").map(Number))
        .map(([x, y, z]) => ({ x, y, z }))
        .map(
            ({ x, y, z }) =>
                [
                    { x, y: y + 1, z },
                    { x, y: y - 1, z },
                    { x: x + 1, y, z },
                    { x: x - 1, y, z },
                    { x, y, z: z + 1 },
                    { x, y, z: z - 1 },
                ].filter(({ x: x1, y: y1, z: z1 }) => !plottedDropletScan.has(`${x1},${y1},${z1}`))
                    .length
        )
        .reduce((n1, n2) => n1 + n2)

export const parseDropletScan = (input) =>
    input
        .split("\n")
        .map((line) => line.split(",").map(Number))
        .map(([x, y, z]) => ({ x, y, z }))

export const plotDropletScan = (droplets, grid) =>
    droplets.reduce((newGrid, { x, y, z }) => newGrid.add(`${x},${y},${z}`), new Set(grid))
