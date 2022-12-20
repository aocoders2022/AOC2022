export const findMaxGeodeCount = (minutes, blueprint, state = makeInitialState()) => {
    if (minutes === 1) {
        return Math.max(
            0,
            ...getNextPossibleStates(state, blueprint).map(
                (nextPossibleState) => nextPossibleState.geodeCount
            )
        )
    }

    return Math.max(
        0,
        ...getNextPossibleStates(state, blueprint).map((nextPossibleState) =>
            findMaxGeodeCount(minutes - 1, blueprint, nextPossibleState)
        )
    )
}

export const getNextPossibleStates = (state, blueprint) => {
    const makeNewState = (partialState) => ({ ...state, ...partialState })
    let nextPossibleStates = []

    // save everything
    nextPossibleStates.push(
        makeNewState({
            oreCount: state.oreCount + state.oreRobotCount,

            clayCount: state.clayCount + state.clayRobotCount,

            obsidianCount: state.obsidianCount + state.obsidianRobotCount,

            geodeCount: state.geodeCount + state.geodeRobotCount,
        })
    )

    // spend on ore robots
    const affordableOreRobotCount = Math.floor(state.oreCount / blueprint.oreRobotCostOre)
    const canAffordOreRobot = affordableOreRobotCount > 0

    if (canAffordOreRobot) {
        nextPossibleStates.push(
            makeNewState({
                oreCount:
                    state.oreCount +
                    state.oreRobotCount -
                    blueprint.oreRobotCostOre * affordableOreRobotCount,
                oreRobotCount: state.oreRobotCount + affordableOreRobotCount,

                clayCount: state.clayCount + state.clayRobotCount,

                obsidianCount: state.obsidianCount + state.obsidianRobotCount,

                geodeCount: state.geodeCount + state.geodeRobotCount,
            })
        )
    }

    // spend on clay robots
    const affordableClayRobotCount = Math.floor(state.oreCount / blueprint.clayRobotCostOre)
    const canAffordClayRobot = affordableClayRobotCount > 0

    if (canAffordClayRobot) {
        nextPossibleStates.push(
            makeNewState({
                oreCount:
                    state.oreCount +
                    state.oreRobotCount -
                    blueprint.clayRobotCostOre * affordableClayRobotCount,

                clayCount: state.clayCount + state.clayRobotCount,
                clayRobotCount: state.clayRobotCount + affordableClayRobotCount,

                obsidianCount: state.obsidianCount + state.obsidianRobotCount,

                geodeCount: state.geodeCount + state.geodeRobotCount,
            })
        )
    }

    // spend on obsidian robots
    const affordableObsidianRobotCount = Math.min(
        Math.floor(state.oreCount / blueprint.obsidianRobotCostOre),
        Math.floor(state.clayCount / blueprint.obsidianRobotCostClay)
    )
    const canAffordObsidianRobot = affordableObsidianRobotCount > 0

    if (canAffordObsidianRobot) {
        nextPossibleStates.push(
            makeNewState({
                oreCount:
                    state.oreCount +
                    state.oreRobotCount -
                    blueprint.obsidianRobotCostOre * affordableObsidianRobotCount,

                clayCount:
                    state.clayCount +
                    state.clayRobotCount -
                    blueprint.obsidianRobotCostClay * affordableObsidianRobotCount,

                obsidianCount: state.obsidianCount + state.obsidianRobotCount,
                obsidianRobotCount: state.obsidianRobotCount + affordableObsidianRobotCount,

                geodeCount: state.geodeCount + state.geodeRobotCount,
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
                oreCount:
                    state.oreCount +
                    state.oreRobotCount -
                    blueprint.geodeRobotCostOre * affordableGeodeRobotCount,

                clayCount: state.clayCount + state.clayRobotCount,

                obsidianCount:
                    state.obsidianCount +
                    state.obsidianRobotCount -
                    blueprint.geodeRobotCostObsidian * affordableGeodeRobotCount,

                geodeCount: state.geodeCount + state.geodeRobotCount,
                geodeRobotCount: state.geodeRobotCount + affordableGeodeRobotCount,
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
