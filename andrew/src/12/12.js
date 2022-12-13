export const getCell = ([r, c], grid) => getRow([r, c], grid)?.[c] ?? null

export const getCoordinates = (character, grid) => {
    const r = grid.findIndex((row) => row.includes(character))
    const c = getRow([r], grid).findIndex((cell) => cell === character)

    return [r, c]
}

export const getEndCoordinates = getCoordinates.bind(null, "E")

export const getNumericValue = (letter) =>
    letter.toLowerCase() === letter ? letter.charCodeAt(0) - 96 : letter === "E" ? 26 : 1

export const getRow = ([r], grid) => grid[r] || null

export const getShortestPathLength = ([fromR, fromC], [toR, toC], grid) => {
    const makeKey = ([r, c]) => `${r}_${c}`
    const visited = { [makeKey([fromR, fromC])]: true }

    let queue = [[[fromR, fromC], 0]]

    while (queue.length) {
        const [[currentR, currentC], currentDistance] = queue[0]

        queue = queue.slice(1)

        if (currentR === toR && currentC === toC) {
            return currentDistance
        }

        getSurroundingTraversableCoordinates([currentR, currentC], grid)
            .filter((coordinates) => !visited[makeKey(coordinates)])
            .map((coordinates) => [coordinates, currentDistance + 1])
            .forEach(([coordinates, distance]) => {
                visited[makeKey(coordinates)] = true
                queue = [...queue, [coordinates, distance]]
            })
    }

    return Infinity
}

export const getShortestDownwardPathLength = ([fromR, fromC], grid) =>
    Math.min(
        ...grid
            .map((row, r) =>
                row
                    .map((_, c) => [r, c])
                    .filter((coordinates) => getNumericValue(getCell(coordinates, grid)) === 1)
            )
            .flat(1)
            .map((coordinates) => getShortestPathLength(coordinates, [fromR, fromC], grid))
    )

export const getStartCoordinates = getCoordinates.bind(null, "S")

export const getSurroundingCoordinates = ([r, c], grid) =>
    [
        [r - 1, c],
        [r, c - 1],
        [r, c + 1],
        [r + 1, c],
    ].filter((coordinates) => getCell(coordinates, grid) !== null)

export const getSurroundingTraversableCoordinates = ([r, c], grid) =>
    getSurroundingCoordinates([r, c], grid).filter((coordinates) =>
        isTraversable([r, c], coordinates, grid)
    )

export const isTraversable = ([fromR, fromC], [toR, toC], grid) =>
    getNumericValue(getCell([toR, toC], grid)) <= getNumericValue(getCell([fromR, fromC], grid)) + 1
