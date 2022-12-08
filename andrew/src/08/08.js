import { takeLastWhile, takeWhile } from "ramda"

const getSquare = ([r, c], grid) => (grid[r] ? grid[r][c] : 0)

const isVisibleFromEdge = ([r, c], grid) => {
    const rowLeft = grid[r].slice(0, c)
    const rowRight = grid[r].slice(c + 1)

    const col = grid.map((row) => row.find((_, i) => i === c))
    const colTop = col.slice(0, r)
    const colBottom = col.slice(r + 1)

    return (
        rowLeft.every((cell) => cell < getSquare([r, c], grid)) ||
        rowRight.every((cell) => cell < getSquare([r, c], grid)) ||
        colTop.every((cell) => cell < getSquare([r, c], grid)) ||
        colBottom.every((cell) => cell < getSquare([r, c], grid))
    )
}

const isVisible = ([r, c], grid) => {
    const row = grid[r]
    const col = grid.map((row) => row.find((_, i) => i === c))

    return (
        isVisibleFromEdge([r, c], grid) ||
        r === 0 ||
        c === 0 ||
        r === col.length - 1 ||
        c === row.length - 1
    )
}

export const countVisibleTrees = (trees) => trees.length

export const getVisibleTrees = (grid) =>
    grid.map((row, r) => row.filter((__, c) => isVisible([r, c], grid))).flat()

export const calculateScenicScore = ([r, c], grid) => {
    const square = getSquare([r, c], grid)

    const rowLeft = grid[r].slice(0, c)
    const rowRight = grid[r].slice(c + 1)

    const col = grid.map((row) => row.find((_, i) => i === c))
    const colTop = col.slice(0, r)
    const colBottom = col.slice(r + 1)

    const seeRight = takeWhile((cell) => cell < square, rowRight)
    const seeBottom = takeWhile((cell) => cell < square, colBottom)
    const seeTop = takeLastWhile((cell) => cell < square, colTop)
    const seeLeft = takeLastWhile((cell) => cell < square, rowLeft)

    const totalSeeRight =
        seeRight.length === rowRight.length ? seeRight.length : seeRight.length + 1
    const totalSeeBottom =
        seeBottom.length === colBottom.length ? seeBottom.length : seeBottom.length + 1
    const totalSeeTop = seeTop.length === colTop.length ? seeTop.length : seeTop.length + 1
    const totalSeeLeft = seeLeft.length === rowLeft.length ? seeLeft.length : seeLeft.length + 1

    return totalSeeRight * totalSeeBottom * totalSeeTop * totalSeeLeft
}

export const findHighestScenicScore = (grid) =>
    Math.max(...grid.map((row, r) => row.map((__, c) => calculateScenicScore([r, c], grid))).flat())
