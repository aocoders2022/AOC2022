import { takeLastWhile, takeWhile } from "ramda"

const getCell = ([r, c], grid) => (getRow([r], grid) ? grid[r][c] : 0)
const getCol = ([, c], grid) => grid.map((row) => row.find((_, i) => i === c))
const getRow = ([r], grid) => grid[r]

const getBefore = (i, trees) => trees.slice(0, i)
const getAfter = (i, trees) => trees.slice(i + 1)

const getColBottom = ([r, c], grid) => getAfter(r, getCol([r, c], grid))
const getColTop = ([r, c], grid) => getBefore(r, getCol([r, c], grid))
const getRowLeft = ([r, c], grid) => getBefore(c, getRow([r], grid))
const getRowRight = ([r, c], grid) => getAfter(c, getRow([r], grid))

const isTreeLower = ([r, c], grid, cell) => cell < getCell([r, c], grid)

const isVisibleFromEdge = ([r, c], grid) =>
    getRowLeft([r, c], grid).every(isTreeLower.bind(null, [r, c], grid)) ||
    getRowRight([r, c], grid).every(isTreeLower.bind(null, [r, c], grid)) ||
    getColTop([r, c], grid).every(isTreeLower.bind(null, [r, c], grid)) ||
    getColBottom([r, c], grid).every(isTreeLower.bind(null, [r, c], grid))

const isVisible = ([r, c], grid) =>
    isVisibleFromEdge([r, c], grid) ||
    r === 0 ||
    c === 0 ||
    r === getRow([r, c], grid).length - 1 ||
    c === getCol([r, c], grid).length - 1

const getViewDistance = (trees, viewable) =>
    viewable.length === trees.length ? viewable.length : viewable.length + 1

export const countVisibleTrees = (trees) => trees.length

export const getVisibleTrees = (grid) =>
    grid.map((row, r) => row.filter((__, c) => isVisible([r, c], grid))).flat()

export const calculateScenicScore = ([r, c], grid) =>
    getViewDistance(
        getRowRight([r, c], grid),
        takeWhile(isTreeLower.bind(null, [r, c], grid), getRowRight([r, c], grid))
    ) *
    getViewDistance(
        getColBottom([r, c], grid),
        takeWhile(isTreeLower.bind(null, [r, c], grid), getColBottom([r, c], grid))
    ) *
    getViewDistance(
        getColTop([r, c], grid),
        takeLastWhile(isTreeLower.bind(null, [r, c], grid), getColTop([r, c], grid))
    ) *
    getViewDistance(
        getRowLeft([r, c], grid),
        takeLastWhile(isTreeLower.bind(null, [r, c], grid), getRowLeft([r, c], grid))
    )

export const findHighestScenicScore = (grid) =>
    Math.max(...grid.map((row, r) => row.map((__, c) => calculateScenicScore([r, c], grid))).flat())
