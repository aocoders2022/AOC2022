export const makeMap = (scans, sand) => {
    const parsedScans = scans.map((scan) =>
        scan
            .split(" -> ")
            .map((coordinates) => coordinates.split(","))
            .map(([col, row]) => ({ col: Number(col), row: Number(row) }))
    )
    const flatParsedScans = parsedScans.flat()

    const rowCoordinates = flatParsedScans.map(({ row }) => row)
    const firstRowIndex = 0
    const lastRowIndex = Math.max(...rowCoordinates)

    const colCoordinates = flatParsedScans.map(({ col }) => col)
    const firstColIndex = Math.min(...colCoordinates)
    const lastColIndex = Math.max(...colCoordinates)

    const emptyMap = Array(lastColIndex - firstColIndex + 1)
        .fill(null)
        .map(() => Array(lastRowIndex - firstRowIndex + 1).fill("."))

    const offsetCol = (col) => col - firstColIndex

    const offsetScans = parsedScans.map((scan) =>
        scan.map(({ col, row }) => ({ col: offsetCol(col), row }))
    )

    const isBetween = (n, [n1, n2]) => (n1 <= n && n <= n2) || (n2 <= n && n <= n1)

    const isBetweenCoordinates = ([r, c], [start, end]) =>
        isBetween(r, [start.row, end.row]) && isBetween(c, [start.col, end.col])

    const isRock = ([r, c]) =>
        offsetScans.some((scan) =>
            scan.some(
                ({ col, row }, i) =>
                    i > 0 && isBetweenCoordinates([r, c], [{ col, row }, scan[i - 1]])
            )
        )

    const isSand = ([r, c]) => {
        const [sandCol, sandRow] = sand.split(",").map(Number)

        return r === sandRow && c === offsetCol(sandCol)
    }

    return emptyMap.map((row, r) =>
        row.map((col, c) => (isRock([r, c]) ? "#" : isSand([r, c]) ? "+" : col))
    )
}

export const letSandFall = (map) => {
    const entryRow = map.findIndex((row) => row.includes("+"))
    const entryCol = map[entryRow].findIndex((cell) => cell.includes("+"))

    const canFall = ({ col, row }) => {
        return (
            map[row + 1][col] === "." ||
            (map[sandCoordinates.row + 1][sandCoordinates.col] !== "." &&
                map[sandCoordinates.row + 1][sandCoordinates.col - 1] === ".") ||
            (map[sandCoordinates.row + 1][sandCoordinates.col] !== "." &&
                map[sandCoordinates.row + 1][sandCoordinates.col + 1] === ".")
        )
    }

    let sandCoordinates = { col: entryCol, row: entryRow }

    while (canFall(sandCoordinates)) {
        if (map[sandCoordinates.row + 1][sandCoordinates.col] === ".") {
            sandCoordinates = {
                ...sandCoordinates,
                row: sandCoordinates.row + 1,
            }
        } else {
            if (
                map[sandCoordinates.row + 1][sandCoordinates.col] !== "." &&
                map[sandCoordinates.row + 1][sandCoordinates.col - 1] === "."
            ) {
                sandCoordinates = {
                    ...sandCoordinates,
                    row: sandCoordinates.row + 1,
                    col: sandCoordinates.col - 1,
                }
            } else if (
                map[sandCoordinates.row + 1][sandCoordinates.col] !== "." &&
                map[sandCoordinates.row + 1][sandCoordinates.col + 1] === "."
            ) {
                sandCoordinates = {
                    ...sandCoordinates,
                    row: sandCoordinates.row + 1,
                    col: sandCoordinates.col + 1,
                }
            }
        }
    }

    return map.map((row, r) =>
        row.map((cell, c) => (r === sandCoordinates.row && c === sandCoordinates.col ? "o" : cell))
    )
}

export const dropSand = (number, map) => {
    let i = 0

    while (i < number) {
        map = letSandFall(map)
        i++
    }

    return map

    // for number times (maybe infinity?)
    // keep dropping sand
    // if It goes off the edge, break & return the map
}

export const countSandParticles = (map) => {
    // count the particles
}
