import {
    findMaxGeodeCount,
    getNextPossibleStates,
    makeInitialState,
    parseBluePrint,
    sumBlueprintQualityLevels,
} from "@/19/19"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "19.input.txt")))
    .split("\n")
    .map(parseBluePrint)

const mockBlueprint1 = () => ({
    blueprintId: 1,

    oreRobotCostOre: 4,

    clayRobotCostOre: 2,

    obsidianRobotCostOre: 3,
    obsidianRobotCostClay: 14,

    geodeRobotCostOre: 2,
    geodeRobotCostObsidian: 7,
})

const mockBlueprint2 = () => ({
    blueprintId: 2,

    oreRobotCostOre: 2,

    clayRobotCostOre: 3,

    obsidianRobotCostOre: 3,
    obsidianRobotCostClay: 8,

    geodeRobotCostOre: 3,
    geodeRobotCostObsidian: 12,
})

describe("findMaxGeodeCount", () => {
    it.only("should return the maximum amount of geodes that could be found within the time frame", () => {
        expect(findMaxGeodeCount(18, mockBlueprint1())).toEqual(0)

        expect(findMaxGeodeCount(19, mockBlueprint1())).toEqual(1)

        // expect(findMaxGeodeCount(24, mockBlueprint1())).toEqual(9)

        // expect(findMaxGeodeCount(24, mockBlueprint2())).toEqual(12)

        // expect(findMaxGeodeCount(24, INPUT[0])).toEqual(5)

        // expect(findMaxGeodeCount(24, INPUT[1])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[1])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[2])).toEqual(2)

        // expect(findMaxGeodeCount(24, INPUT[3])).toEqual(10)

        // expect(findMaxGeodeCount(24, INPUT[4])).toEqual(3)

        // expect(findMaxGeodeCount(24, INPUT[5])).toEqual(6)

        // expect(findMaxGeodeCount(24, INPUT[6])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[7])).toEqual(11)

        // expect(findMaxGeodeCount(24, INPUT[8])).toEqual(3)

        // expect(findMaxGeodeCount(24, INPUT[9])).toEqual(8)

        // expect(findMaxGeodeCount(24, INPUT[10])).toEqual(1)

        // expect(findMaxGeodeCount(24, INPUT[11])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[12])).toEqual(1)

        // expect(findMaxGeodeCount(24, INPUT[13])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[14])).toEqual(15)

        // expect(findMaxGeodeCount(24, INPUT[15])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[16])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[17])).toEqual(12)

        // expect(findMaxGeodeCount(24, INPUT[18])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[19])).toEqual(2)

        // expect(findMaxGeodeCount(24, INPUT[20])).toEqual(1)

        // expect(findMaxGeodeCount(24, INPUT[21])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[22])).toEqual(3)

        // expect(findMaxGeodeCount(24, INPUT[23])).toEqual(14)

        // expect(findMaxGeodeCount(24, INPUT[24])).toEqual(1)

        // expect(findMaxGeodeCount(24, INPUT[25])).toEqual(1)

        // expect(findMaxGeodeCount(24, INPUT[26])).toEqual(2)

        // expect(findMaxGeodeCount(24, INPUT[27])).toEqual(0)

        // expect(findMaxGeodeCount(24, INPUT[28])).toEqual(9)

        // expect(findMaxGeodeCount(24, INPUT[29])).toEqual(1)
    })
})

describe("getNextPossibleStates", () => {
    it("should return all the next possible states after following the blueprint", () => {
        // minute 1
        expect(getNextPossibleStates(makeInitialState(), mockBlueprint1())).toEqual([
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 0,
                clayRobotCount: 0,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 2
        expect(
            getNextPossibleStates(
                {
                    oreCount: 1,
                    oreRobotCount: 1,

                    clayCount: 0,
                    clayRobotCount: 0,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 0,
                clayRobotCount: 0,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 3
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 0,
                    clayRobotCount: 0,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 0,
                clayRobotCount: 0,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 0,
                clayRobotCount: 1,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 4
        expect(
            getNextPossibleStates(
                {
                    oreCount: 1,
                    oreRobotCount: 1,

                    clayCount: 0,
                    clayRobotCount: 1,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 1,
                clayRobotCount: 1,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 5
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 1,
                    clayRobotCount: 1,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 2,
                clayRobotCount: 1,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 2,
                clayRobotCount: 2,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 6
        expect(
            getNextPossibleStates(
                {
                    oreCount: 1,
                    oreRobotCount: 1,

                    clayCount: 2,
                    clayRobotCount: 2,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 4,
                clayRobotCount: 2,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 7
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 4,
                    clayRobotCount: 2,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 6,
                clayRobotCount: 2,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 6,
                clayRobotCount: 3,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 8
        expect(
            getNextPossibleStates(
                {
                    oreCount: 1,
                    oreRobotCount: 1,

                    clayCount: 6,
                    clayRobotCount: 3,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 9,
                clayRobotCount: 3,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])
        // minute 9
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 9,
                    clayRobotCount: 3,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 12,
                clayRobotCount: 3,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 12,
                clayRobotCount: 4,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 10
        expect(
            getNextPossibleStates(
                {
                    oreCount: 3,
                    oreRobotCount: 1,

                    clayCount: 12,
                    clayRobotCount: 3,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 4,
                oreRobotCount: 1,

                clayCount: 15,
                clayRobotCount: 3,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 15,
                clayRobotCount: 4,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 11
        expect(
            getNextPossibleStates(
                {
                    oreCount: 4,
                    oreRobotCount: 1,

                    clayCount: 15,
                    clayRobotCount: 3,

                    obsidianCount: 0,
                    obsidianRobotCount: 0,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 5,
                oreRobotCount: 1,

                clayCount: 18,
                clayRobotCount: 3,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 2,

                clayCount: 18,
                clayRobotCount: 3,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 18,
                clayRobotCount: 4,

                obsidianCount: 0,
                obsidianRobotCount: 0,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 4,
                clayRobotCount: 3,

                obsidianCount: 0,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 12
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 4,
                    clayRobotCount: 3,

                    obsidianCount: 0,
                    obsidianRobotCount: 1,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 7,
                clayRobotCount: 3,

                obsidianCount: 1,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 7,
                clayRobotCount: 4,

                obsidianCount: 1,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 13
        expect(
            getNextPossibleStates(
                {
                    oreCount: 1,
                    oreRobotCount: 1,

                    clayCount: 7,
                    clayRobotCount: 4,

                    obsidianCount: 1,
                    obsidianRobotCount: 1,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 11,
                clayRobotCount: 4,

                obsidianCount: 2,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 14
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 11,
                    clayRobotCount: 4,

                    obsidianCount: 2,
                    obsidianRobotCount: 1,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 15,
                clayRobotCount: 4,

                obsidianCount: 3,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 15,
                clayRobotCount: 5,

                obsidianCount: 3,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 15
        expect(
            getNextPossibleStates(
                {
                    oreCount: 3,
                    oreRobotCount: 1,

                    clayCount: 15,
                    clayRobotCount: 4,

                    obsidianCount: 3,
                    obsidianRobotCount: 1,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 4,
                oreRobotCount: 1,

                clayCount: 19,
                clayRobotCount: 4,

                obsidianCount: 4,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 19,
                clayRobotCount: 5,

                obsidianCount: 4,
                obsidianRobotCount: 1,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 5,
                clayRobotCount: 4,

                obsidianCount: 4,
                obsidianRobotCount: 2,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])
        // minute 16
        expect(
            getNextPossibleStates(
                {
                    oreCount: 1,
                    oreRobotCount: 1,

                    clayCount: 5,
                    clayRobotCount: 4,

                    obsidianCount: 4,
                    obsidianRobotCount: 2,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 9,
                clayRobotCount: 4,

                obsidianCount: 6,
                obsidianRobotCount: 2,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])
        // minute 17
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 9,
                    clayRobotCount: 4,

                    obsidianCount: 6,
                    obsidianRobotCount: 2,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 13,
                clayRobotCount: 4,

                obsidianCount: 8,
                obsidianRobotCount: 2,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 13,
                clayRobotCount: 5,

                obsidianCount: 8,
                obsidianRobotCount: 2,

                geodeCount: 0,
                geodeRobotCount: 0,
            },
        ])

        // minute 18
        expect(
            getNextPossibleStates(
                {
                    oreCount: 3,
                    oreRobotCount: 1,

                    clayCount: 13,
                    clayRobotCount: 4,

                    obsidianCount: 8,
                    obsidianRobotCount: 2,

                    geodeCount: 0,
                    geodeRobotCount: 0,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 17,
                clayRobotCount: 4,

                obsidianCount: 3,
                obsidianRobotCount: 2,

                geodeCount: 0,
                geodeRobotCount: 1,
            },
        ])

        // minute 19
        expect(
            getNextPossibleStates(
                {
                    oreCount: 2,
                    oreRobotCount: 1,

                    clayCount: 17,
                    clayRobotCount: 4,

                    obsidianCount: 3,
                    obsidianRobotCount: 2,

                    geodeCount: 0,
                    geodeRobotCount: 1,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 21,
                clayRobotCount: 4,

                obsidianCount: 5,
                obsidianRobotCount: 2,

                geodeCount: 1,
                geodeRobotCount: 1,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 21,
                clayRobotCount: 5,

                obsidianCount: 5,
                obsidianRobotCount: 2,

                geodeCount: 1,
                geodeRobotCount: 1,
            },
        ])
        // minute 20
        expect(
            getNextPossibleStates(
                {
                    oreCount: 3,
                    oreRobotCount: 1,

                    clayCount: 21,
                    clayRobotCount: 4,

                    obsidianCount: 5,
                    obsidianRobotCount: 2,

                    geodeCount: 1,
                    geodeRobotCount: 1,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 4,
                oreRobotCount: 1,

                clayCount: 25,
                clayRobotCount: 4,

                obsidianCount: 7,
                obsidianRobotCount: 2,

                geodeCount: 2,
                geodeRobotCount: 1,
            },
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 25,
                clayRobotCount: 5,

                obsidianCount: 7,
                obsidianRobotCount: 2,

                geodeCount: 2,
                geodeRobotCount: 1,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 11,
                clayRobotCount: 4,

                obsidianCount: 7,
                obsidianRobotCount: 3,

                geodeCount: 2,
                geodeRobotCount: 1,
            },
        ])
        // minute 21
        expect(
            getNextPossibleStates(
                {
                    oreCount: 4,
                    oreRobotCount: 1,

                    clayCount: 25,
                    clayRobotCount: 4,

                    obsidianCount: 7,
                    obsidianRobotCount: 2,

                    geodeCount: 2,
                    geodeRobotCount: 1,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 29,
                clayRobotCount: 4,

                obsidianCount: 2,
                obsidianRobotCount: 2,

                geodeCount: 3,
                geodeRobotCount: 2,
            },
        ])

        // minute 22
        expect(
            getNextPossibleStates(
                {
                    oreCount: 3,
                    oreRobotCount: 1,

                    clayCount: 29,
                    clayRobotCount: 4,

                    obsidianCount: 2,
                    obsidianRobotCount: 2,

                    geodeCount: 3,
                    geodeRobotCount: 2,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 4,
                oreRobotCount: 1,

                clayCount: 33,
                clayRobotCount: 4,

                obsidianCount: 4,
                obsidianRobotCount: 2,

                geodeCount: 5,
                geodeRobotCount: 2,
            },
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 33,
                clayRobotCount: 5,

                obsidianCount: 4,
                obsidianRobotCount: 2,

                geodeCount: 5,
                geodeRobotCount: 2,
            },
            {
                oreCount: 1,
                oreRobotCount: 1,

                clayCount: 19,
                clayRobotCount: 4,

                obsidianCount: 4,
                obsidianRobotCount: 3,

                geodeCount: 5,
                geodeRobotCount: 2,
            },
        ])

        // minute 23
        expect(
            getNextPossibleStates(
                {
                    oreCount: 4,
                    oreRobotCount: 1,

                    clayCount: 33,
                    clayRobotCount: 4,

                    obsidianCount: 4,
                    obsidianRobotCount: 2,

                    geodeCount: 5,
                    geodeRobotCount: 2,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 5,
                oreRobotCount: 1,

                clayCount: 37,
                clayRobotCount: 4,

                obsidianCount: 6,
                obsidianRobotCount: 2,

                geodeCount: 7,
                geodeRobotCount: 2,
            },
            {
                oreCount: 1,
                oreRobotCount: 2,

                clayCount: 37,
                clayRobotCount: 4,

                obsidianCount: 6,
                obsidianRobotCount: 2,

                geodeCount: 7,
                geodeRobotCount: 2,
            },
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 37,
                clayRobotCount: 5,

                obsidianCount: 6,
                obsidianRobotCount: 2,

                geodeCount: 7,
                geodeRobotCount: 2,
            },
            {
                oreCount: 2,
                oreRobotCount: 1,

                clayCount: 23,
                clayRobotCount: 4,

                obsidianCount: 6,
                obsidianRobotCount: 3,

                geodeCount: 7,
                geodeRobotCount: 2,
            },
        ])

        // minute 24
        expect(
            getNextPossibleStates(
                {
                    oreCount: 5,
                    oreRobotCount: 1,

                    clayCount: 37,
                    clayRobotCount: 4,

                    obsidianCount: 6,
                    obsidianRobotCount: 2,

                    geodeCount: 7,
                    geodeRobotCount: 2,
                },
                mockBlueprint1()
            )
        ).toEqual([
            {
                oreCount: 6,
                oreRobotCount: 1,

                clayCount: 41,
                clayRobotCount: 4,

                obsidianCount: 8,
                obsidianRobotCount: 2,

                geodeCount: 9,
                geodeRobotCount: 2,
            },
            {
                oreCount: 2,
                oreRobotCount: 2,

                clayCount: 41,
                clayRobotCount: 4,

                obsidianCount: 8,
                obsidianRobotCount: 2,

                geodeCount: 9,
                geodeRobotCount: 2,
            },
            {
                oreCount: 4,
                oreRobotCount: 1,

                clayCount: 41,
                clayRobotCount: 5,

                obsidianCount: 8,
                obsidianRobotCount: 2,

                geodeCount: 9,
                geodeRobotCount: 2,
            },
            {
                oreCount: 3,
                oreRobotCount: 1,

                clayCount: 27,
                clayRobotCount: 4,

                obsidianCount: 8,
                obsidianRobotCount: 3,

                geodeCount: 9,
                geodeRobotCount: 2,
            },
        ])
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

describe("sumBlueprintQualityLevels", () => {
    it("should return the sum of the blueprint quality levels", () => {
        expect(
            sumBlueprintQualityLevels([
                { blueprintId: 1, geodeCount: 9 },
                { blueprintId: 2, geodeCount: 12 },
            ])
        ).toEqual(33)

        // expect(
        //     sumBlueprintQualityLevels(
        //         INPUT.map((blueprint) => ({
        //             blueprintId: blueprint.blueprintId,
        //             geodeCount: findMaxGeodeCount(24, blueprint),
        //         }))
        //     )
        // ).toEqual(1624)
    })
})
