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

    const moveRocksDownward = (moveableRocks) =>
        canMoveRocksDown(movingRocks, chamber) ? moveRocksDown(moveableRocks) : moveableRocks

    let movingRocks = rocks
    let prevRocks = null
    let i = index

    while (true) {
        movingRocks = moveRocksLaterally(movingRocks, i)
        prevRocks = movingRocks
        movingRocks = moveRocksDownward(movingRocks)

        i++

        if (movingRocks === prevRocks) {
            break
        }
    }

    return [movingRocks, i]
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

export const getTowerHeightCached = (iterations, chamber, jetPatterns) => {
    const getHeight = (c) => getChamberMaxY(c) + 1

    const cache = new Map()

    let partiallyFullChamber = chamber
    let jetPatternIndex = 0
    let i = 0

    while (i < iterations) {
        const rocks = getNextRocks(i)

        const [droppedRocks, nextJetPatternIndex] = dropRocks(
            placeRocksInChamber(rocks, partiallyFullChamber),
            partiallyFullChamber,
            jetPatternIndex,
            jetPatterns
        )

        const newChamber = addRocksToChamber(droppedRocks, partiallyFullChamber)

        const isLooped = isContinuousLoop(newChamber, i, cache, 100)

        if (isLooped) {
            const [chamberAtEndOfFirstLoop, itemsDroppedToFinishFirstLoop] = isLooped

            const loopHeight = getHeight(newChamber) - getHeight(chamberAtEndOfFirstLoop)
            const startHeight = getHeight(chamberAtEndOfFirstLoop) - loopHeight

            const loopItems = i + 1 - itemsDroppedToFinishFirstLoop
            const startItems = itemsDroppedToFinishFirstLoop - loopItems

            const iterationsWithoutStart = iterations - startItems
            const loopCount = Math.floor(iterationsWithoutStart / loopItems)
            const endItems = iterationsWithoutStart - loopCount * loopItems

            const endHeight =
                getTowerHeight(itemsDroppedToFinishFirstLoop + endItems, chamber, jetPatterns) -
                getHeight(chamberAtEndOfFirstLoop)

            return startHeight + loopCount * loopHeight + endHeight
        } else {
            partiallyFullChamber = newChamber
            jetPatternIndex = nextJetPatternIndex
            i++
        }
    }

    return getChamberMaxY(partiallyFullChamber) + 1
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

    return getChamberMaxY(fullChamber) + 1
}

export const isContinuousLoop = (chamber, i, cache, size) => {
    const coordinates = Array.from(chamber).map((xy) => xy.split(",").map(Number))
    const sortedCoordinatesY = Array.from(
        new Set(coordinates.map(([, y]) => y).sort((n1, n2) => n2 - n1))
    )
    const topYCoordinates = sortedCoordinatesY.slice(0, size)
    const topCoordinates = coordinates.filter(([, y]) => topYCoordinates.includes(y))

    const normalizedTopCoordinates = topCoordinates.map(([x, y]) => [
        x,
        y - topYCoordinates[topYCoordinates.length - 1],
    ])

    const topCoordinatesKey = normalizedTopCoordinates
        .map(([x, y]) => `${x},${y}`)
        .sort()
        .join("_")

    if (cache.has(topCoordinatesKey)) {
        return cache.get(topCoordinatesKey)
    }

    cache.set(topCoordinatesKey, [chamber, i + 1])

    return false
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
