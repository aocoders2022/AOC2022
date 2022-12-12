export const getCell = ([r, c], grid) => getRow([r, c], grid)[c]

export const getCoordinates = (character, grid) => {
    const r = grid.findIndex((row) => row.includes(character))
    const c = getRow([r], grid).findIndex((cell) => cell === character)

    return [r, c]
}

export const getEndCoordinates = getCoordinates.bind(null, "E")

export const getNumericValue = (letter) => letter.charCodeAt(0) - 96

export const getRow = ([r], grid) => grid[r]

export const getShortestPath = ([fromR, fromC], [toR, toC], grid) => []

export const getShortestPathLength = ([fromR, fromC], [toR, toC], grid) =>
    getShortestPath([fromR, fromC], [toR, toC], grid).length

export const getStartCoordinates = getCoordinates.bind(null, "S")

export const getSurroundingCoordinates = ([r, c]) => [
    [r - 1, c],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c],
]
