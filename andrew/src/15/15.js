const extractRanges = (row, coordinates) =>
    coordinates
        .filter(({ beaconX, beaconY, sensorX, sensorY }) => {
            const distance = getDistance({ x: beaconX, y: beaconY }, { x: sensorX, y: sensorY })

            return (
                (row >= sensorY && row <= sensorY + distance) ||
                (row <= sensorY && row >= sensorY - distance)
            )
        })
        .map(({ beaconX, beaconY, sensorX, sensorY }) => {
            const distance = getDistance({ x: beaconX, y: beaconY }, { x: sensorX, y: sensorY })
            const distanceToRow = getDistance({ x: sensorX, y: row }, { x: sensorX, y: sensorY })

            const widestPoint = 1 + distance * 2
            const overlapWidth = widestPoint - 2 * distanceToRow

            const overlapStart = sensorX - (overlapWidth - 1) / 2
            const overlapEnd = sensorX + (overlapWidth - 1) / 2

            return [
                { x: overlapStart, y: row },
                { x: overlapEnd, y: row },
            ]
        })
        .sort(([{ x: xA }], [{ x: xB }]) => xA - xB)
        .reduce((ranges, [start, end]) => {
            if (!ranges.length) {
                return [[start, end]]
            }

            const [lastStart, lastEnd] = ranges[ranges.length - 1]

            if ((start.x <= lastEnd.x && lastEnd.x <= end.x) || lastEnd.x + 1 === start.x) {
                return [...ranges.slice(0, -1), [lastStart, end]]
            } else if (lastEnd.x < start.x) {
                return [...ranges, [start, end]]
            }

            return ranges
        }, [])

export const countRowEmptySpace = (row, coordinates) => {
    const beaconsInRow = new Set(
        coordinates
            .filter(({ beaconY }) => beaconY === row)
            .map(({ beaconX, beaconY }) => `${beaconX}_${beaconY}`)
    ).size

    const sensorsInRow = new Set(
        coordinates
            .filter(({ sensorY }) => sensorY === row)
            .map(({ sensorX, sensorY }) => `${sensorX}_${sensorY}`)
    ).size

    const overlapsInRow = extractRanges(row, coordinates).reduce(
        (total, [start, end]) => Math.abs(end.x - start.x) + 1 + total,
        0
    )

    return overlapsInRow - beaconsInRow - sensorsInRow
}

export const getDistance = ({ x: fromX, y: fromY }, { x: toX, y: toY }) =>
    Math.abs(fromX - toX) + Math.abs(fromY - toY)

export const parseInput = (input) =>
    input
        .split("\n")
        .map(
            (line) =>
                /Sensor at x=(?<sensorX>[-]?[0-9]+), y=(?<sensorY>[-]?[0-9]+): closest beacon is at x=(?<beaconX>[-]?[0-9]+), y=(?<beaconY>[-]?[0-9]+)/.exec(
                    line
                ).groups
        )
        .map((coordinates) =>
            Object.fromEntries(
                Object.entries(coordinates).map(([key, value]) => [key, Number(value)])
            )
        )

export const findTuningFrequency = (size, coordinates) => {
    const row = Array(size)
        .fill(null)
        .map((_, i) => {
            const ranges = extractRanges(i, coordinates)

            return ranges.map(([start, end]) => {
                const startX = start.x < 0 ? 0 : start.x > size ? size : start.x
                const startY = start.y < 0 ? 0 : start.y > size ? size : start.y
                const endX = end.x < 0 ? 0 : end.x > size ? size : end.x
                const endY = end.y < 0 ? 0 : end.y > size ? size : end.y

                return [
                    { x: startX, y: startY },
                    { x: endX, y: endY },
                ]
            })
        })
        .filter(
            (ranges) =>
                ranges.length > 1 || ranges[0][0].x !== 0 || ranges[ranges.length - 1][1].x !== size // or doesn't touch edge
        )

    if (row.length > 1) {
        throw "issue"
    }

    const [firstBlock] = row[0]

    return (firstBlock[1].x + 1) * 4000000 + firstBlock[0].y
}
