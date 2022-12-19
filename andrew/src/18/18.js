export const countExteriorSurfaces = (plottedDropletScan) =>
    countUnconnectedSurfaces(plottedDropletScan) -
    countUnconnectedSurfaces(getTrappedPockets(plottedDropletScan))

export const countUnconnectedSurfaces = (plottedDropletScan) =>
    Array.from(plottedDropletScan)
        .map((xyz) => xyz.split(",").map(Number))
        .map(([x, y, z]) => ({ x, y, z }))
        .map(
            ({ x, y, z }) =>
                getSiblings({ x, y, z }).filter(
                    ({ x: x1, y: y1, z: z1 }) => !plottedDropletScan.has(`${x1},${y1},${z1}`)
                ).length
        )
        .reduce((n1, n2) => n1 + n2)

export const getSiblings = ({ x, y, z }) => [
    { x, y: y + 1, z },
    { x, y: y - 1, z },
    { x: x + 1, y, z },
    { x: x - 1, y, z },
    { x, y, z: z + 1 },
    { x, y, z: z - 1 },
]

export const getTrappedPockets = (plottedDropletScan) => {
    const plottedCoordinates = Array.from(plottedDropletScan)
        .map((xyz) => xyz.split(",").map(Number))
        .map(([x, y, z]) => ({ x, y, z }))

    const xCoordinates = plottedCoordinates.map(({ x }) => x)
    const yCoordinates = plottedCoordinates.map(({ y }) => y)
    const zCoordinates = plottedCoordinates.map(({ z }) => z)

    const minX = Math.min(...xCoordinates)
    const maxX = Math.max(...xCoordinates)
    const xSliceCount = maxX - minX + 1

    const minY = Math.min(...yCoordinates)
    const maxY = Math.max(...yCoordinates)
    const ySliverCount = maxY - minY + 1

    const minZ = Math.min(...zCoordinates)
    const maxZ = Math.max(...zCoordinates)
    const zBlockCount = maxZ - minZ + 1

    const cubeCoordinates = Array.from(Array(xSliceCount), (_, i) => i + minX).flatMap((x) =>
        Array.from(Array(ySliverCount), (_, j) => j + minY).flatMap((y) =>
            Array.from(Array(zBlockCount), (_, k) => k + minZ).map((z) => ({ x, y, z }))
        )
    )

    const potentiallyTrappedPockets = cubeCoordinates
        .filter(({ x, y, z }) => !plottedDropletScan.has(`${x},${y},${z}`))
        .filter(({ x, y, z }) => isEnclosed({ x, y, z }, plottedCoordinates))

    const trappedPockets = potentiallyTrappedPockets.filter(({ x, y, z }, j) => {
        const stillToCheck = [{ x, y, z }]
        const alreadyFetched = new Set([`${x},${y},${z}`])

        while (stillToCheck.length) {
            const nextToCheck = stillToCheck.shift()

            const siblings = getSiblings(nextToCheck)

            const emptySiblings = siblings.filter(
                (sibling) =>
                    !plottedDropletScan.has(`${sibling.x},${sibling.y},${sibling.z}`) &&
                    !alreadyFetched.has(`${sibling.x},${sibling.y},${sibling.z}`)
            )

            emptySiblings.forEach((es) => {
                stillToCheck.push(es)
                alreadyFetched.add(`${es.x},${es.y},${es.z}`)
            })

            if (!isEnclosed(nextToCheck, plottedCoordinates)) {
                return false
            }
        }

        return true
    })

    return new Set(trappedPockets.map(({ x, y, z }) => `${x},${y},${z}`))
}

export const isEnclosed = ({ x, y, z }, plottedCoordinates) => {
    const hasSiblingsLeft = plottedCoordinates.some(
        (coordinates) => coordinates.y === y && coordinates.z === z && coordinates.x < x
    )

    const hasSiblingsRight = plottedCoordinates.some(
        (coordinates) => coordinates.y === y && coordinates.z === z && coordinates.x > x
    )

    const hasSiblingsAbove = plottedCoordinates.some(
        (coordinates) => coordinates.y > y && coordinates.z === z && coordinates.x === x
    )

    const hasSiblingsBelow = plottedCoordinates.some(
        (coordinates) => coordinates.y < y && coordinates.z === z && coordinates.x === x
    )

    const hasSiblingsFront = plottedCoordinates.some(
        (coordinates) => coordinates.y === y && coordinates.z > z && coordinates.x === x
    )

    const hasSiblingsBehind = plottedCoordinates.some(
        (coordinates) => coordinates.y === y && coordinates.z < z && coordinates.x === x
    )

    return (
        hasSiblingsLeft &&
        hasSiblingsRight &&
        hasSiblingsAbove &&
        hasSiblingsBelow &&
        hasSiblingsFront &&
        hasSiblingsBehind
    )
}

export const parseDropletScan = (input) =>
    input
        .split("\n")
        .map((line) => line.split(",").map(Number))
        .map(([x, y, z]) => ({ x, y, z }))

export const plotDropletScan = (droplets, unplottedDropletScan) =>
    droplets.reduce(
        (plottedDropletScan, { x, y, z }) => plottedDropletScan.add(`${x},${y},${z}`),
        new Set(unplottedDropletScan)
    )
