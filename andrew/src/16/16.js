export const calculatePressure = (
    remainingMinutes,
    currentPressure,
    currentValve,
    parsedReport,
    isVisited = new Set()
) => {
    if (remainingMinutes === 0) return currentPressure

    const nextValves = parsedReport[currentValve].distances.filter(
        ([valve, distance]) =>
            valve !== currentValve &&
            parsedReport[valve].flow &&
            !isVisited.has(valve) &&
            distance + 1 < remainingMinutes
    )

    if (!nextValves.length) return currentPressure * remainingMinutes

    return Math.max(
        ...nextValves.map(([nextValve, distance]) => {
            const newCurrentPressure = currentPressure + parsedReport[nextValve].flow
            const spentMinutes = distance + 1
            const newRemainingMinutes = remainingMinutes - spentMinutes

            return (
                currentPressure * spentMinutes +
                calculatePressure(
                    newRemainingMinutes,
                    newCurrentPressure,
                    nextValve,
                    parsedReport,
                    new Set(isVisited).add(currentValve)
                )
            )
        })
    )
}

export const getShortestDistance = (valveA, valveB, inputObject, isVisited = new Set()) => {
    if (valveA === valveB) return 0

    const unvisitedConnections = inputObject[valveA].connections.filter(
        (connection) => !isVisited.has(connection)
    )

    if (unvisitedConnections.includes(valveB)) return 1

    return (
        1 +
        Math.min(
            ...unvisitedConnections.map((connection) =>
                getShortestDistance(connection, valveB, inputObject, isVisited.add(valveA))
            )
        )
    )
}

export const parseReport = (input) => {
    const inputEntries = input
        .split("\n")
        .map((line) =>
            line.match(/Valve (\w{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)/)
        )
        .map(([, valve, flow, connections]) => [
            valve,
            { connections: connections.split(", "), flow: Number(flow) },
        ])

    const inputObject = Object.fromEntries(inputEntries)

    return Object.fromEntries(
        inputEntries.map(([valve, data]) => [
            valve,
            {
                ...data,
                distances: inputEntries.map(([valveB]) => [
                    valveB,
                    getShortestDistance(valve, valveB, inputObject),
                ]),
            },
        ])
    )
}
