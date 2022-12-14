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
