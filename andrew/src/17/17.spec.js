import {
    addRocksToChamber,
    canMoveRocksDown,
    canMoveRocksLeft,
    canMoveRocksRight,
    drawRocks,
    dropRocks,
    getChamberMaxY,
    getJetDirection,
    getNextRocks,
    getTowerHeight,
    getTowerHeightCached,
    isJetDirectionLeft,
    isJetDirectionRight,
    makeCornerRocks,
    makeCrossRocks,
    makeHorizontalRocks,
    makeSquareRocks,
    makeVerticalRocks,
    moveRocksDown,
    moveRocksDownTimes,
    moveRocksLeft,
    moveRocksLeftTimes,
    moveRocksRight,
    moveRocksRightTimes,
    moveRocksUp,
    moveRocksUpTimes,
    placeRocksInChamber,
} from "@/17/17"
import { readFileSync } from "fs"
import { resolve } from "path"

const EXAMPLE = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>".split("")

const INPUT = String(readFileSync(resolve(__dirname, "17.input.txt"))).split("")

describe("addRocksToChamber", () => {
    it("should return the chamber with the rocks added", () => {
        expect(addRocksToChamber(makeCrossRocks(), new Set(["0,0"]))).toEqual(
            new Set(["0,0", "1,0", "0,1", "1,1", "2,1", "1,2"])
        )
    })
})

describe("canMoveRocksDown", () => {
    it("should return true if the rocks are not blocked", () => {
        expect(canMoveRocksDown(moveRocksUp(makeCrossRocks()), new Set())).toEqual(true)
    })

    it("should return false if the rocks are not on the floor", () => {
        expect(canMoveRocksDown(makeCrossRocks(), new Set())).toEqual(false)
    })

    it("should return false if the rocks are against other rocks", () => {
        expect(canMoveRocksDown(moveRocksUp(makeCrossRocks()), new Set(["1,0"]))).toEqual(false)
    })
})

describe("canMoveRocksLeft", () => {
    it("should return true if the rocks are not blocked", () => {
        expect(canMoveRocksLeft(moveRocksRight(makeCrossRocks()), new Set())).toEqual(true)
    })

    it("should return false if the rocks are against the left wall", () => {
        expect(canMoveRocksLeft(makeCrossRocks(), new Set())).toEqual(false)
    })

    it("should return false if the rocks are against other rocks", () => {
        expect(canMoveRocksLeft(moveRocksRight(makeCrossRocks()), new Set(["0,1"]))).toEqual(false)
    })
})

describe("canMoveRocksRight", () => {
    it("should return true if the rocks are not blocked", () => {
        expect(canMoveRocksRight(makeCrossRocks(), new Set())).toEqual(true)
    })

    it("should return false if the rocks are against the right wall", () => {
        expect(canMoveRocksRight(moveRocksRightTimes(4, makeCrossRocks()), new Set())).toEqual(
            false
        )
    })

    it("should return false if the rocks are against other rocks", () => {
        expect(canMoveRocksRight(makeCrossRocks(), new Set(["3,1"]))).toEqual(false)
    })
})

describe("dropRocks", () => {
    it("should drop the rocks within the chamber - example 1", () => {
        const chamber = new Set()

        expect(
            dropRocks(placeRocksInChamber(makeHorizontalRocks(), chamber), chamber, 0, EXAMPLE)
        ).toEqual([new Set(["2,0", "3,0", "4,0", "5,0"]), 4])
    })

    it("should drop the rocks within the chamber - example 2", () => {
        const chamber = new Set(["2,0", "3,0", "4,0", "5,0"])

        expect(
            dropRocks(placeRocksInChamber(makeCrossRocks(), chamber), chamber, 4, EXAMPLE)
        ).toEqual([new Set(["3,1", "2,2", "3,2", "4,2", "3,3"]), 8])
    })

    it("should drop the rocks within the chamber - example 3", () => {
        const chamber = new Set(["2,0", "3,0", "4,0", "5,0", "3,1", "2,2", "3,2", "4,2", "3,3"])

        expect(
            dropRocks(placeRocksInChamber(makeCornerRocks(), chamber), chamber, 8, EXAMPLE)
        ).toEqual([new Set(["0,3", "1,3", "2,3", "2,4", "2,5"]), 13])
    })

    it("should drop the rocks within the chamber - example 4", () => {
        const chamber = new Set([
            "0,3",
            "1,3",
            "2,3",
            "2,4",
            "2,5",
            "2,0",
            "3,0",
            "4,0",
            "5,0",
            "3,1",
            "2,2",
            "3,2",
            "4,2",
            "3,3",
        ])

        expect(
            dropRocks(placeRocksInChamber(makeVerticalRocks(), chamber), chamber, 13, EXAMPLE)
        ).toEqual([new Set(["4,3", "4,4", "4,5", "4,6"]), 20])
    })
})

describe("getChamberMaxY", () => {
    it("should return the floor for an empty chamber", () => {
        expect(getChamberMaxY(new Set())).toEqual(-1)
    })

    it("should return the max y coordinate for a chamber", () => {
        expect(getChamberMaxY(new Set(["1,0"]))).toEqual(0)

        expect(getChamberMaxY(new Set(["1,1", "1,2", "3,1"]))).toEqual(2)
    })
})

describe("getJetDirection", () => {
    it("should return the jet direction at a given index", () => {
        expect(getJetDirection(0, "abc")).toEqual("a")

        expect(getJetDirection(1, "abc")).toEqual("b")

        expect(getJetDirection(2, "abc")).toEqual("c")

        expect(getJetDirection(3, "abc")).toEqual("a")

        expect(getJetDirection(4, "abc")).toEqual("b")

        expect(getJetDirection(5, "abc")).toEqual("c")

        expect(getJetDirection(6, "abc")).toEqual("a")

        expect(getJetDirection(7, "abc")).toEqual("b")

        expect(getJetDirection(8, "abc")).toEqual("c")
    })
})

describe("getNextRocks", () => {
    it("should return the rock formation at a given index", () => {
        expect(getNextRocks(0)).toEqual(makeHorizontalRocks())

        expect(getNextRocks(1)).toEqual(makeCrossRocks())

        expect(getNextRocks(2)).toEqual(makeCornerRocks())

        expect(getNextRocks(3)).toEqual(makeVerticalRocks())

        expect(getNextRocks(4)).toEqual(makeSquareRocks())

        expect(getNextRocks(5)).toEqual(makeHorizontalRocks())

        expect(getNextRocks(6)).toEqual(makeCrossRocks())

        expect(getNextRocks(7)).toEqual(makeCornerRocks())

        expect(getNextRocks(8)).toEqual(makeVerticalRocks())

        expect(getNextRocks(9)).toEqual(makeSquareRocks())

        expect(getNextRocks(10)).toEqual(makeHorizontalRocks())

        expect(getNextRocks(11)).toEqual(makeCrossRocks())

        expect(getNextRocks(12)).toEqual(makeCornerRocks())

        expect(getNextRocks(13)).toEqual(makeVerticalRocks())

        expect(getNextRocks(14)).toEqual(makeSquareRocks())
    })
})

describe("getTowerHeight", () => {
    it("should return the tower height after a number of iterations", () => {
        expect(getTowerHeight(2004, new Set(), EXAMPLE)).toEqual(3040) // 2022 without end

        expect(getTowerHeight(2022, new Set(), EXAMPLE)).toEqual(3068)

        expect(getTowerHeight(2022, new Set(), INPUT)).toEqual(3232)
    })
})

describe("getTowerHeightCached", () => {
    it("should return the tower height after a number of cached iterations", () => {
        expect(getTowerHeightCached(1000000000000, new Set(), EXAMPLE)).toEqual(1514285714288)

        expect(getTowerHeightCached(1000000000000, new Set(), INPUT)).toEqual(1585632183915)
    })
})

describe("isJetDirectionLeft", () => {
    it("should return true for the left jet direction", () => {
        expect(isJetDirectionLeft("<")).toEqual(true)
    })

    it("should return false for the right jet direction", () => {
        expect(isJetDirectionLeft(">")).toEqual(false)
    })
})

describe("isJetDirectionRight", () => {
    it("should return true for the right jet direction", () => {
        expect(isJetDirectionRight(">")).toEqual(true)
    })

    it("should return false for the left jet direction", () => {
        expect(isJetDirectionRight("<")).toEqual(false)
    })
})

describe("makeCornerRocks", () => {
    it("should return a corner rock formation", () => {
        expect(drawRocks(makeCornerRocks())).toEqual([
            [".", ".", "#"],
            [".", ".", "#"],
            ["#", "#", "#"],
        ])
    })
})

describe("makeCrossRocks", () => {
    it("should return a cross rock formation", () => {
        expect(drawRocks(makeCrossRocks())).toEqual([
            [".", "#", "."],
            ["#", "#", "#"],
            [".", "#", "."],
        ])
    })
})

describe("makeHorizontalRocks", () => {
    it("should return a horizontal rock formation", () => {
        expect(drawRocks(makeHorizontalRocks())).toEqual([["#", "#", "#", "#"]])
    })
})

describe("makeSquareRocks", () => {
    it("should return a square rock formation", () => {
        expect(drawRocks(makeSquareRocks())).toEqual([
            ["#", "#"],
            ["#", "#"],
        ])
    })
})

describe("makeVerticalRocks", () => {
    it("should return a vertical rock formation", () => {
        expect(drawRocks(makeVerticalRocks())).toEqual([["#"], ["#"], ["#"], ["#"]])
    })
})

describe("moveRocksDown", () => {
    it("should return the rock formation after being moved down", () => {
        expect(moveRocksDown(makeCrossRocks())).toEqual(
            new Set(["1,-1", "0,0", "1,0", "2,0", "1,1"])
        )
    })
})

describe("moveRocksDownTimes", () => {
    it("should return the rock formation after being moved down a number of times", () => {
        expect(moveRocksDownTimes(2, makeCrossRocks())).toEqual(
            new Set(["1,-2", "0,-1", "1,-1", "2,-1", "1,0"])
        )
    })
})

describe("moveRocksLeft", () => {
    it("should return the rock formation after being moved left", () => {
        expect(moveRocksLeft(makeCrossRocks())).toEqual(
            new Set(["0,0", "-1,1", "0,1", "1,1", "0,2"])
        )
    })
})

describe("moveRocksLeftTimes", () => {
    it("should return the rock formation after being moved left a number of times", () => {
        expect(moveRocksLeftTimes(2, makeCrossRocks())).toEqual(
            new Set(["-1,0", "-2,1", "-1,1", "0,1", "-1,2"])
        )
    })
})

describe("moveRocksRight", () => {
    it("should return the rock formation after being moved right", () => {
        expect(moveRocksRight(makeCrossRocks())).toEqual(
            new Set(["2,0", "1,1", "2,1", "3,1", "2,2"])
        )
    })
})

describe("moveRocksRightTimes", () => {
    it("should return the rock formation after being moved right a number of times", () => {
        expect(moveRocksRightTimes(2, makeCrossRocks())).toEqual(
            new Set(["3,0", "2,1", "3,1", "4,1", "3,2"])
        )
    })
})

describe("moveRocksUp", () => {
    it("should return the rock formation after being moved up", () => {
        expect(moveRocksUp(makeCrossRocks())).toEqual(new Set(["1,1", "0,2", "1,2", "2,2", "1,3"]))
    })
})

describe("moveRocksUpTimes", () => {
    it("should return the rock formation after being moved up a number of times", () => {
        expect(moveRocksUpTimes(2, makeCrossRocks())).toEqual(
            new Set(["1,2", "0,3", "1,3", "2,3", "1,4"])
        )
    })
})

describe("placeRocksInChamber", () => {
    it("should return the rocks when placed into an empty chamber", () => {
        expect(placeRocksInChamber(makeHorizontalRocks(), new Set())).toEqual(
            new Set(["2,3", "3,3", "4,3", "5,3"])
        )
    })

    it("should return the rocks when placed into a full chamber", () => {
        expect(
            placeRocksInChamber(makeCrossRocks(), new Set(["2,0", "3,0", "4,0", "5,0"]))
        ).toEqual(new Set(["3,4", "2,5", "3,5", "4,5", "3,6"]))
    })
})
