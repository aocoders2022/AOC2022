export const followBlueprint = (minutes, blueprint) =>
    Array.from(Array(minutes), (_, i) => i + 1).reduce((state) => {
        const affordableClayRobotCount = Math.floor(state.oreCount / blueprint.clayRobotCostOre)
        const canAffordClayRobot = affordableClayRobotCount > 0

        return {
            ...state,

            oreCount: canAffordClayRobot
                ? state.oreCount + state.oreRobotCount - blueprint.clayRobotCostOre
                : state.oreCount + state.oreRobotCount,

            clayCount: state.clayCount + state.clayRobotCount,
            clayRobotCount: canAffordClayRobot
                ? state.clayRobotCount + affordableClayRobotCount
                : state.clayRobotCount,
        }
    }, makeInitialState())

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
