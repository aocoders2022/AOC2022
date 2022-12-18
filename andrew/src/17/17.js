export const addRocksToChamber = (rocks, chamber) => new Set([...chamber, ...rocks])

export const canMoveRocksDown = (rocks, chamber) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(",").map(Number))
    const minY = Math.min(...coordinates.map(([, y]) => y))

    const movedCoordinates = Array.from(moveRocksDown(rocks))

    return minY > 0 && movedCoordinates.every((xy) => !chamber.has(xy))
}

export const canMoveRocksLeft = (rocks, chamber) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(",").map(Number))
    const minX = Math.min(...coordinates.map(([x]) => x))

    const movedCoordinates = Array.from(moveRocksLeft(rocks))

    return minX > 0 && movedCoordinates.every((xy) => !chamber.has(xy))
}

export const canMoveRocksRight = (rocks, chamber) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(",").map(Number))
    const maxX = Math.max(...coordinates.map(([x]) => x))

    const movedCoordinates = Array.from(moveRocksRight(rocks))

    return maxX < 6 && movedCoordinates.every((xy) => !chamber.has(xy))
}

export const drawRocks = (rocks) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(","))
    const maxX = Math.max(...coordinates.map(([x]) => Number(x)))
    const maxY = Math.max(...coordinates.map(([, y]) => Number(y)))

    return Array.from(Array(maxY + 1), (_, y) =>
        Array.from(Array(maxX + 1), (_, x) => (rocks.has(`${x},${maxY - y}`) ? "#" : "."))
    )
}

export const dropRocks = (rocks, chamber, index, jetPatterns) => {
    const moveRocksLaterally = (moveableRocks, i) =>
        isJetDirectionRight(getJetDirection(i, jetPatterns))
            ? canMoveRocksRight(moveableRocks, chamber)
                ? moveRocksRight(moveableRocks)
                : moveableRocks
            : canMoveRocksLeft(moveableRocks, chamber)
            ? moveRocksLeft(moveableRocks)
            : moveableRocks

    const laterallyMovedRocks = moveRocksLaterally(rocks, index)
    const downwardMovedRocks = moveRocksDown(laterallyMovedRocks)

    if (canMoveRocksDown(downwardMovedRocks, chamber)) {
        return dropRocks(downwardMovedRocks, chamber, index + 1, jetPatterns)
    }

    const laterallyMovedRocksAgain = moveRocksLaterally(downwardMovedRocks, index + 1)

    if (canMoveRocksDown(laterallyMovedRocksAgain, chamber)) {
        return [moveRocksDown(laterallyMovedRocksAgain), index + 2]
    }

    return [laterallyMovedRocksAgain, index + 2]
}

export const getChamberMaxY = (chamber) => {
    const coordinates = Array.from(chamber).map((xy) => xy.split(",").map(Number))

    return coordinates.length ? Math.max(...coordinates.map(([, y]) => y)) : -1
}

export const getJetDirection = (index, jetPatterns) => jetPatterns[index % jetPatterns.length]

export const getNextRocks = (index) => {
    const rockFormations = [
        makeHorizontalRocks(),
        makeCrossRocks(),
        makeCornerRocks(),
        makeVerticalRocks(),
        makeSquareRocks(),
    ]

    return rockFormations[index % rockFormations.length]
}

export const getTowerHeight = (iterations, chamber, jetPatterns) => {
    const [fullChamber] = Array.from(Array(iterations), (_, i) => i).reduce(
        ([partiallyFullChamber, jetPatternIndex], rocksIndex) => {
            const rocks = getNextRocks(rocksIndex)

            const [droppedRocks, nextJetPatternIndex] = dropRocks(
                placeRocksInChamber(rocks, partiallyFullChamber),
                partiallyFullChamber,
                jetPatternIndex,
                jetPatterns
            )

            return [addRocksToChamber(droppedRocks, partiallyFullChamber), nextJetPatternIndex]
        },
        [chamber, 0]
    )

    return getChamberMaxY(fullChamber)
}

export const isJetDirectionLeft = (jetDirection) => jetDirection === "<"

export const isJetDirectionRight = (jetDirection) => jetDirection === ">"

export const makeCornerRocks = () => new Set(["0,0", "1,0", "2,0", "2,1", "2,2"])

export const makeCrossRocks = () => new Set(["1,0", "0,1", "1,1", "2,1", "1,2"])

export const makeHorizontalRocks = () => new Set(["0,0", "1,0", "2,0", "3,0"])

export const makeSquareRocks = () => new Set(["0,0", "1,0", "0,1", "1,1"])

export const makeVerticalRocks = () => new Set(["0,0", "0,1", "0,2", "0,3"])

export const moveRocksDown = (rocks) => moveRocksDownTimes(1, rocks)

export const moveRocksDownTimes = (times, rocks) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(",").map(Number))
    const movedCoordinates = coordinates.map(([x, y]) => [x, y - times])

    return new Set(movedCoordinates.map(([x, y]) => `${x},${y}`))
}

export const moveRocksLeft = (rocks) => moveRocksLeftTimes(1, rocks)

export const moveRocksLeftTimes = (times, rocks) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(",").map(Number))
    const movedCoordinates = coordinates.map(([x, y]) => [x - times, y])

    return new Set(movedCoordinates.map(([x, y]) => `${x},${y}`))
}

export const moveRocksRight = (rocks) => moveRocksRightTimes(1, rocks)

export const moveRocksRightTimes = (times, rocks) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(",").map(Number))
    const movedCoordinates = coordinates.map(([x, y]) => [x + times, y])

    return new Set(movedCoordinates.map(([x, y]) => `${x},${y}`))
}

export const moveRocksUp = (rocks) => moveRocksUpTimes(1, rocks)

export const moveRocksUpTimes = (times, rocks) => {
    const coordinates = Array.from(rocks).map((xy) => xy.split(",").map(Number))
    const movedCoordinates = coordinates.map(([x, y]) => [x, y + times])

    return new Set(movedCoordinates.map(([x, y]) => `${x},${y}`))
}

export const placeRocksInChamber = (rocks, chamber) => {
    const maxY = getChamberMaxY(chamber)
    const minRocksY = maxY + 4

    return moveRocksRightTimes(2, moveRocksUpTimes(minRocksY, rocks))
}
