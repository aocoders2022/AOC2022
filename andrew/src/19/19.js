export const findMaxGeodeCount = (
    minutes,
    blueprint,
    state = makeInitialState(),
    cache = new Set()
) => {
    const nextPossibleStates = getNextPossibleStates(state, blueprint, minutes).filter(
        (nextPossibleState) => {
            const key = JSON.stringify([minutes, nextPossibleState])
            const isCached = cache.has(key)

            if (!isCached) {
                cache.add(key)
            }

            return !isCached
        }
    )

    if (minutes === 1) {
        return Math.max(
            0,
            ...nextPossibleStates.map((nextPossibleState) => nextPossibleState.geodeCount)
        )
    }

    return Math.max(
        0,
        ...nextPossibleStates.map((nextPossibleState) =>
            findMaxGeodeCount(minutes - 1, blueprint, nextPossibleState, cache)
        )
    )
}

export const getNextPossibleStates = (state, blueprint, remainingTime) => {
    const makeNewState = (partialState) => ({
        ...state,

        oreCount: state.oreCount + state.oreRobotCount,

        clayCount: state.clayCount + state.clayRobotCount,

        obsidianCount: state.obsidianCount + state.obsidianRobotCount,

        geodeCount: state.geodeCount + state.geodeRobotCount,

        ...partialState,
    })

    let nextPossibleStates = []

    // save everything
    nextPossibleStates.push(makeNewState({}))

    // spend on ore robots
    const affordableOreRobotCount = Math.floor(state.oreCount / blueprint.oreRobotCostOre)
    const canAffordOreRobot = affordableOreRobotCount > 0

    const maxOreNeeded = Math.max(
        blueprint.oreRobotCostOre,
        blueprint.clayRobotCostOre,
        blueprint.obsidianRobotCostOre,
        blueprint.geodeRobotCostOre
    )
    const hasReachedMaxOreRobots =
        state.oreRobotCount >= maxOreNeeded ||
        state.oreRobotCount * remainingTime + state.oreCount >= remainingTime * maxOreNeeded

    if (canAffordOreRobot && !hasReachedMaxOreRobots) {
        nextPossibleStates.push(
            makeNewState({
                oreCount: state.oreCount + state.oreRobotCount - blueprint.oreRobotCostOre,

                oreRobotCount: state.oreRobotCount + 1,
            })
        )
    }

    // spend on clay robots
    const affordableClayRobotCount = Math.floor(state.oreCount / blueprint.clayRobotCostOre)
    const canAffordClayRobot = affordableClayRobotCount > 0

    const maxClayNeeded = Math.max(blueprint.obsidianRobotCostClay)
    const hasReachedMaxClayRobots =
        state.clayRobotCount >= maxClayNeeded ||
        state.clayRobotCount * remainingTime + state.clayCount >= remainingTime * maxClayNeeded

    if (canAffordClayRobot && !hasReachedMaxClayRobots) {
        nextPossibleStates.push(
            makeNewState({
                oreCount: state.oreCount + state.oreRobotCount - blueprint.clayRobotCostOre,

                clayRobotCount: state.clayRobotCount + 1,
            })
        )
    }

    // spend on obsidian robots
    const affordableObsidianRobotCount = Math.min(
        Math.floor(state.oreCount / blueprint.obsidianRobotCostOre),
        Math.floor(state.clayCount / blueprint.obsidianRobotCostClay)
    )
    const canAffordObsidianRobot = affordableObsidianRobotCount > 0

    const maxObsidianNeeded = Math.max(blueprint.geodeRobotCostObsidian)
    const hasReachedMaxObsidianRobots =
        state.obsidianRobotCount >= maxObsidianNeeded ||
        state.obsidianRobotCount * remainingTime + state.obsidianCount >=
            remainingTime * maxObsidianNeeded

    if (canAffordObsidianRobot && !hasReachedMaxObsidianRobots) {
        nextPossibleStates.push(
            makeNewState({
                oreCount: state.oreCount + state.oreRobotCount - blueprint.obsidianRobotCostOre,

                clayCount: state.clayCount + state.clayRobotCount - blueprint.obsidianRobotCostClay,

                obsidianRobotCount: state.obsidianRobotCount + 1,
            })
        )
    }

    // spend on geode robots
    const affordableGeodeRobotCount = Math.min(
        Math.floor(state.oreCount / blueprint.geodeRobotCostOre),
        Math.floor(state.obsidianCount / blueprint.geodeRobotCostObsidian)
    )
    const canAffordGeodeRobot = affordableGeodeRobotCount > 0

    if (canAffordGeodeRobot) {
        nextPossibleStates = [] // I aim want to do this.

        nextPossibleStates.push(
            makeNewState({
                oreCount: state.oreCount + state.oreRobotCount - blueprint.geodeRobotCostOre,

                obsidianCount:
                    state.obsidianCount +
                    state.obsidianRobotCount -
                    blueprint.geodeRobotCostObsidian,

                geodeRobotCount: state.geodeRobotCount + 1,
            })
        )
    }

    return nextPossibleStates
}

export const makeInitialState = () => ({
    oreCount: 0,
    oreRobotCount: 1,

    clayCount: 0,
    clayRobotCount: 0,

    obsidianCount: 0,
    obsidianRobotCount: 0,

    geodeCount: 0,
    geodeRobotCount: 0,
})

export const parseBluePrint = (inputLine) => {
    const [
        ,
        blueprintId,
        oreRobotCostOre,
        clayRobotCostOre,
        obsidianRobotCostOre,
        obsidianRobotCostClay,
        geodeRobotCostOre,
        geodeRobotCostObsidian,
    ] = inputLine.match(
        /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./
    )

    return {
        blueprintId: Number(blueprintId),

        oreRobotCostOre: Number(oreRobotCostOre),

        clayRobotCostOre: Number(clayRobotCostOre),

        obsidianRobotCostOre: Number(obsidianRobotCostOre),
        obsidianRobotCostClay: Number(obsidianRobotCostClay),

        geodeRobotCostOre: Number(geodeRobotCostOre),
        geodeRobotCostObsidian: Number(geodeRobotCostObsidian),
    }
}

export const sumBlueprintQualityLevels = (analysisResults) =>
    analysisResults.reduce(
        (qualityLevel, { blueprintId, geodeCount }) => qualityLevel + blueprintId * geodeCount,
        0
    )
