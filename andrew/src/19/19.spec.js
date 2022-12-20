import { followBlueprint, makeInitialState, parseBluePrint } from "@/19/19"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "19.input.txt"))).split("\n")

const mockBlueprint = () => ({
    blueprintId: 1,

    oreRobotCostOre: 4,

    clayRobotCostOre: 2,

    obsidianRobotCostOre: 3,
    obsidianRobotCostClay: 14,

    geodeRobotCostOre: 2,
    geodeRobotCostObsidian: 7,
})

describe("followBlueprint", () => {
    it("should return the state after following the given blueprint for a number of minutes", () => {
        expect(followBlueprint(1, mockBlueprint())).toEqual({
            oreCount: 1,
            oreRobotCount: 1,

            clayCount: 0,
            clayRobotCount: 0,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        expect(followBlueprint(2, mockBlueprint())).toEqual({
            oreCount: 2,
            oreRobotCount: 1,

            clayCount: 0,
            clayRobotCount: 0,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        expect(followBlueprint(3, mockBlueprint())).toEqual({
            oreCount: 1,
            oreRobotCount: 1,

            clayCount: 0,
            clayRobotCount: 1,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        expect(followBlueprint(4, mockBlueprint())).toEqual({
            oreCount: 2,
            oreRobotCount: 1,

            clayCount: 1,
            clayRobotCount: 1,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        expect(followBlueprint(5, mockBlueprint())).toEqual({
            oreCount: 1,
            oreRobotCount: 1,

            clayCount: 2,
            clayRobotCount: 2,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        expect(followBlueprint(6, mockBlueprint())).toEqual({
            oreCount: 2,
            oreRobotCount: 1,

            clayCount: 4,
            clayRobotCount: 2,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        expect(followBlueprint(7, mockBlueprint())).toEqual({
            oreCount: 1,
            oreRobotCount: 1,

            clayCount: 6,
            clayRobotCount: 3,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        expect(followBlueprint(8, mockBlueprint())).toEqual({
            oreCount: 2,
            oreRobotCount: 1,

            clayCount: 9,
            clayRobotCount: 3,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })

        // expect(followBlueprint(9, mockBlueprint())).toEqual({
        //     oreCount: 3,
        //     oreRobotCount: 1,

        //     clayCount: 12,
        //     clayRobotCount: 3,

        //     obsidianCount: 0,
        //     obsidianRobotCount: 0,

        //     geodeCount: 0,
        //     geodeRobotCount: 0,
        // })
    })
})

describe("makeInitialState", () => {
    it("should return the initial state before any minutes pass", () => {
        expect(makeInitialState()).toEqual({
            oreCount: 0,
            oreRobotCount: 1,

            clayCount: 0,
            clayRobotCount: 0,

            obsidianCount: 0,
            obsidianRobotCount: 0,

            geodeCount: 0,
            geodeRobotCount: 0,
        })
    })
})

describe("parseBluePrint", () => {
    it("should return a parsed a robot factory blueprint", () => {
        expect(
            parseBluePrint(
                "Blueprint 1: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 2 ore and 9 obsidian."
            )
        ).toEqual({
            blueprintId: 1,

            oreRobotCostOre: 2,

            clayRobotCostOre: 4,

            obsidianRobotCostOre: 2,
            obsidianRobotCostClay: 16,

            geodeRobotCostOre: 2,
            geodeRobotCostObsidian: 9,
        })
    })
})
