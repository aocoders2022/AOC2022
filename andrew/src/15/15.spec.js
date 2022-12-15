import { countRowEmptySpace, findTuningFrequency, getDistance, parseInput } from "@/15/15"
import { readFileSync } from "fs"
import { resolve } from "path"

const EXAMPLE = String(readFileSync(resolve(__dirname, "15.example.txt")))

const INPUT = String(readFileSync(resolve(__dirname, "15.input.txt")))

describe("countRowEmptySpace", () => {
    it("should return count of empty space in a row", () => {
        expect(
            countRowEmptySpace(10, [
                { beaconX: -2, beaconY: 15, sensorX: 2, sensorY: 18 },
                { beaconX: 10, beaconY: 16, sensorX: 9, sensorY: 16 },
                { beaconX: 15, beaconY: 3, sensorX: 13, sensorY: 2 },
                { beaconX: 10, beaconY: 16, sensorX: 12, sensorY: 14 },
                { beaconX: 10, beaconY: 16, sensorX: 10, sensorY: 20 },
                { beaconX: 10, beaconY: 16, sensorX: 14, sensorY: 17 },
                { beaconX: 2, beaconY: 10, sensorX: 8, sensorY: 7 },
                { beaconX: 2, beaconY: 10, sensorX: 2, sensorY: 0 },
                { beaconX: 2, beaconY: 10, sensorX: 0, sensorY: 11 },
                { beaconX: 25, beaconY: 17, sensorX: 20, sensorY: 14 },
                { beaconX: 21, beaconY: 22, sensorX: 17, sensorY: 20 },
                { beaconX: 15, beaconY: 3, sensorX: 16, sensorY: 7 },
                { beaconX: 15, beaconY: 3, sensorX: 14, sensorY: 3 },
                { beaconX: 15, beaconY: 3, sensorX: 20, sensorY: 1 },
            ])
        ).toEqual(26)

        expect(countRowEmptySpace(2000000, parseInput(INPUT))).toEqual(5176944)
    })
})

describe("findTuningFrequency", () => {
    it("should return the tuning frequency for a given set of coordinates", () => {
        expect(
            findTuningFrequency(20, [
                { beaconX: -2, beaconY: 15, sensorX: 2, sensorY: 18 },
                { beaconX: 10, beaconY: 16, sensorX: 9, sensorY: 16 },
                { beaconX: 15, beaconY: 3, sensorX: 13, sensorY: 2 },
                { beaconX: 10, beaconY: 16, sensorX: 12, sensorY: 14 },
                { beaconX: 10, beaconY: 16, sensorX: 10, sensorY: 20 },
                { beaconX: 10, beaconY: 16, sensorX: 14, sensorY: 17 },
                { beaconX: 2, beaconY: 10, sensorX: 8, sensorY: 7 },
                { beaconX: 2, beaconY: 10, sensorX: 2, sensorY: 0 },
                { beaconX: 2, beaconY: 10, sensorX: 0, sensorY: 11 },
                { beaconX: 25, beaconY: 17, sensorX: 20, sensorY: 14 },
                { beaconX: 21, beaconY: 22, sensorX: 17, sensorY: 20 },
                { beaconX: 15, beaconY: 3, sensorX: 16, sensorY: 7 },
                { beaconX: 15, beaconY: 3, sensorX: 14, sensorY: 3 },
                { beaconX: 15, beaconY: 3, sensorX: 20, sensorY: 1 },
            ])
        ).toEqual(56000011)

        // expect(findTuningFrequency(4000000, parseInput(INPUT))).toEqual(13350458933732)
    })
})

describe("getDistance", () => {
    it("should return the distance between two points", () => {
        expect(getDistance({ x: 8, y: 7 }, { x: 2, y: 10 })).toEqual(9)

        expect(getDistance({ x: 2, y: 10 }, { x: 8, y: 7 })).toEqual(9)

        expect(getDistance({ x: 2, y: 2 }, { x: -1, y: -3 })).toEqual(8)

        expect(getDistance({ x: -1, y: -3 }, { x: 2, y: 2 })).toEqual(8)
    })
})

describe("parseInput", () => {
    it("should return the parsed coordinates", () => {
        expect(parseInput(EXAMPLE)).toEqual([
            { beaconX: -2, beaconY: 15, sensorX: 2, sensorY: 18 },
            { beaconX: 10, beaconY: 16, sensorX: 9, sensorY: 16 },
            { beaconX: 15, beaconY: 3, sensorX: 13, sensorY: 2 },
            { beaconX: 10, beaconY: 16, sensorX: 12, sensorY: 14 },
            { beaconX: 10, beaconY: 16, sensorX: 10, sensorY: 20 },
            { beaconX: 10, beaconY: 16, sensorX: 14, sensorY: 17 },
            { beaconX: 2, beaconY: 10, sensorX: 8, sensorY: 7 },
            { beaconX: 2, beaconY: 10, sensorX: 2, sensorY: 0 },
            { beaconX: 2, beaconY: 10, sensorX: 0, sensorY: 11 },
            { beaconX: 25, beaconY: 17, sensorX: 20, sensorY: 14 },
            { beaconX: 21, beaconY: 22, sensorX: 17, sensorY: 20 },
            { beaconX: 15, beaconY: 3, sensorX: 16, sensorY: 7 },
            { beaconX: 15, beaconY: 3, sensorX: 14, sensorY: 3 },
            { beaconX: 15, beaconY: 3, sensorX: 20, sensorY: 1 },
        ])
    })
})
