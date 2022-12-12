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
    const weightedGrid = makeWeightedGrid(
        [fromR, fromC],
        1,
        updateGrid([fromR, fromC], 0, makeGrid([grid.length, getRow([0, 0], grid).length])),
        grid
    )

    return getCell([toR, toC], weightedGrid)
}

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

export const makeGrid = ([r, c]) =>
    Array(r)
        .fill(Infinity)
        .map(() => Array(c).fill(Infinity))

const makeWeightedGrid = ([r, c], weight, unweightedGrid, grid) => {
    const surroundingTraversableCoordinates = getSurroundingTraversableCoordinates([r, c], grid)

    const [changedCoordinates, partiallyWeightedGrid] = surroundingTraversableCoordinates.reduce(
        ([changedCoordinates, partiallyWeightedGrid], [stcR, stcC]) => {
            const weightedValue = getCell([stcR, stcC], partiallyWeightedGrid)

            if (weight < weightedValue) {
                return [
                    [...changedCoordinates, [stcR, stcC]],
                    updateGrid([stcR, stcC], weight, partiallyWeightedGrid),
                ]
            }

            return [changedCoordinates, partiallyWeightedGrid]
        },
        [[], unweightedGrid]
    )

    return changedCoordinates.reduce(
        (weightedGrid, [r, c]) => makeWeightedGrid([r, c], weight + 1, weightedGrid, grid),
        partiallyWeightedGrid
    )
}

export const updateGrid = ([r, c], value, grid) =>
    grid.map((row, i) => row.map((cell, j) => (r === i && c === j ? value : cell)))
