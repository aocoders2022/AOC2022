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

    const emptyMap = Array(lastRowIndex - firstRowIndex + 1)
        .fill(null)
        .map(() => Array(lastColIndex - firstColIndex + 1).fill("."))

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

export const makeFlooredMap = (scans, sand) => {
    const map = makeMap(scans, sand)
    const colCount = map[0].length

    return [...map, Array(colCount).fill("."), Array(colCount).fill("#")]
}

export const makeBufferedMap = (map) => {
    return map.map((row, i) => {
        const isLastRow = i === map.length - 1

        return [
            isLastRow ? "#" : ".",
            isLastRow ? "#" : ".",
            ...row,
            isLastRow ? "#" : ".",
            isLastRow ? "#" : ".",
        ]
    })
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

        if (
            !map[sandCoordinates.row + 1] ||
            !map[sandCoordinates.row + 1][sandCoordinates.col - 1] ||
            !map[sandCoordinates.row + 1][sandCoordinates.col + 1]
        ) {
            return map
        }
    }

    return map.map((row, r) =>
        row.map((cell, c) => (r === sandCoordinates.row && c === sandCoordinates.col ? "o" : cell))
    )
}

export const letSandFallToFloor = (map) => {
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

        if (!map[sandCoordinates.row + 1]) {
            throw "issue"
        }

        if (
            !map[sandCoordinates.row + 1][sandCoordinates.col - 1] ||
            !map[sandCoordinates.row + 1][sandCoordinates.col + 1]
        ) {
            map = makeBufferedMap(map)
            sandCoordinates = {
                ...sandCoordinates,
                col: sandCoordinates.col + 2,
            }
        }
    }

    return map.map((row, r) =>
        row.map((cell, c) => (r === sandCoordinates.row && c === sandCoordinates.col ? "o" : cell))
    )
}

export const dropSand = (number, map) => {
    let i = 0
    let currentMap = map

    while (i < number) {
        const newMap = letSandFall(currentMap)

        if (JSON.stringify(newMap) === JSON.stringify(currentMap)) {
            return currentMap
        }

        currentMap = newMap
        i++
    }

    return currentMap
}

export const dropFlooredSand = (number, map) => {
    let i = 0
    let currentMap = map

    while (i < number) {
        const newMap = letSandFallToFloor(currentMap)

        if (newMap.findIndex((row) => row.includes("+")) === -1) {
            return newMap
        }

        if (JSON.stringify(newMap) === JSON.stringify(currentMap)) {
            return currentMap
        }

        currentMap = newMap
        i++
    }

    return currentMap
}

export const countSandParticles = (map) =>
    dropSand(Infinity, map)
        .flat()
        .filter((cell) => cell === "o").length

export const countFlooredSandParticles = (map) => {
    return dropFlooredSand(Infinity, map)
        .flat()
        .filter((cell) => cell === "o").length
}
