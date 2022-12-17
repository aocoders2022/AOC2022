import { calculatePressure, getShortestDistance, parseReport } from "@/16/16"
import { readFileSync } from "fs"
import { resolve } from "path"

const EXAMPLE = String(readFileSync(resolve(__dirname, "16.example.txt")))

const INPUT = String(readFileSync(resolve(__dirname, "16.input.txt")))

describe("calculatePressure", () => {
    it("should return the pressure after the time has elapsed", () => {
        expect(calculatePressure(1, 0, "AA", parseReport(EXAMPLE))).toEqual(0)

        expect(calculatePressure(2, 0, "AA", parseReport(EXAMPLE))).toEqual(0)

        expect(calculatePressure(3, 0, "AA", parseReport(EXAMPLE))).toEqual(20)

        expect(calculatePressure(4, 0, "AA", parseReport(EXAMPLE))).toEqual(40)

        expect(calculatePressure(5, 0, "AA", parseReport(EXAMPLE))).toEqual(63)

        expect(calculatePressure(30, 0, "AA", parseReport(EXAMPLE))).toEqual(1651)

        expect(calculatePressure(30, 0, "AA", parseReport(INPUT))).toEqual(1828)
    })
})

describe("getShortestDistance", () => {
    it("should return the shortest distance between two valves", () => {
        const inputObject = {
            AA: { connections: ["DD", "II", "BB"], flow: "0", valve: "AA" },
            BB: { connections: ["CC", "AA"], flow: "13", valve: "BB" },
            CC: { connections: ["DD", "BB"], flow: "2", valve: "CC" },
            DD: { connections: ["CC", "AA", "EE"], flow: "20", valve: "DD" },
            EE: { connections: ["FF", "DD"], flow: "3", valve: "EE" },
            FF: { connections: ["EE", "GG"], flow: "0", valve: "FF" },
            GG: { connections: ["FF", "HH"], flow: "0", valve: "GG" },
            HH: { connections: ["GG"], flow: "22", valve: "HH" },
            II: { connections: ["AA", "JJ"], flow: "0", valve: "II" },
            JJ: { connections: ["II"], flow: "21", valve: "JJ" },
        }

        expect(getShortestDistance("FF", "AA", inputObject)).toEqual(3)

        expect(getShortestDistance("FF", "BB", inputObject)).toEqual(4)

        expect(getShortestDistance("FF", "CC", inputObject)).toEqual(3)

        expect(getShortestDistance("FF", "DD", inputObject)).toEqual(2)

        expect(getShortestDistance("FF", "EE", inputObject)).toEqual(1)

        expect(getShortestDistance("FF", "FF", inputObject)).toEqual(0)

        expect(getShortestDistance("FF", "GG", inputObject)).toEqual(1)

        expect(getShortestDistance("FF", "HH", inputObject)).toEqual(2)

        expect(getShortestDistance("FF", "II", inputObject)).toEqual(4)

        expect(getShortestDistance("FF", "JJ", inputObject)).toEqual(5)
    })
})

describe("parseReport", () => {
    it("should return the parsed report", () => {
        expect(parseReport(EXAMPLE)).toEqual({
            AA: {
                connections: ["DD", "II", "BB"],
                distances: [
                    ["AA", 0],
                    ["BB", 1],
                    ["CC", 2],
                    ["DD", 1],
                    ["EE", 2],
                    ["FF", 3],
                    ["GG", 4],
                    ["HH", 5],
                    ["II", 1],
                    ["JJ", 2],
                ],
                flow: 0,
                valve: "AA",
            },
            BB: {
                connections: ["CC", "AA"],
                distances: [
                    ["AA", 1],
                    ["BB", 0],
                    ["CC", 1],
                    ["DD", 2],
                    ["EE", 3],
                    ["FF", 4],
                    ["GG", 5],
                    ["HH", 6],
                    ["II", 2],
                    ["JJ", 3],
                ],
                flow: 13,
                valve: "BB",
            },
            CC: {
                connections: ["DD", "BB"],
                distances: [
                    ["AA", 2],
                    ["BB", 1],
                    ["CC", 0],
                    ["DD", 1],
                    ["EE", 2],
                    ["FF", 3],
                    ["GG", 4],
                    ["HH", 5],
                    ["II", 3],
                    ["JJ", 4],
                ],
                flow: 2,
                valve: "CC",
            },
            DD: {
                connections: ["CC", "AA", "EE"],
                distances: [
                    ["AA", 1],
                    ["BB", 2],
                    ["CC", 1],
                    ["DD", 0],
                    ["EE", 1],
                    ["FF", 2],
                    ["GG", 3],
                    ["HH", 4],
                    ["II", 2],
                    ["JJ", 3],
                ],
                flow: 20,
                valve: "DD",
            },
            EE: {
                connections: ["FF", "DD"],
                distances: [
                    ["AA", 2],
                    ["BB", 3],
                    ["CC", 2],
                    ["DD", 1],
                    ["EE", 0],
                    ["FF", 1],
                    ["GG", 2],
                    ["HH", 3],
                    ["II", 3],
                    ["JJ", 4],
                ],
                flow: 3,
                valve: "EE",
            },
            FF: {
                connections: ["EE", "GG"],
                distances: [
                    ["AA", 3],
                    ["BB", 4],
                    ["CC", 3],
                    ["DD", 2],
                    ["EE", 1],
                    ["FF", 0],
                    ["GG", 1],
                    ["HH", 2],
                    ["II", 4],
                    ["JJ", 5],
                ],
                flow: 0,
                valve: "FF",
            },
            GG: {
                connections: ["FF", "HH"],
                distances: [
                    ["AA", 4],
                    ["BB", 5],
                    ["CC", 4],
                    ["DD", 3],
                    ["EE", 2],
                    ["FF", 1],
                    ["GG", 0],
                    ["HH", 1],
                    ["II", 5],
                    ["JJ", 6],
                ],
                flow: 0,
                valve: "GG",
            },
            HH: {
                connections: ["GG"],
                distances: [
                    ["AA", 5],
                    ["BB", 6],
                    ["CC", 5],
                    ["DD", 4],
                    ["EE", 3],
                    ["FF", 2],
                    ["GG", 1],
                    ["HH", 0],
                    ["II", 6],
                    ["JJ", 7],
                ],
                flow: 22,
                valve: "HH",
            },
            II: {
                connections: ["AA", "JJ"],
                distances: [
                    ["AA", 1],
                    ["BB", 2],
                    ["CC", 3],
                    ["DD", 2],
                    ["EE", 3],
                    ["FF", 4],
                    ["GG", 5],
                    ["HH", 6],
                    ["II", 0],
                    ["JJ", 1],
                ],
                flow: 0,
                valve: "II",
            },
            JJ: {
                connections: ["II"],
                distances: [
                    ["AA", 2],
                    ["BB", 3],
                    ["CC", 4],
                    ["DD", 3],
                    ["EE", 4],
                    ["FF", 5],
                    ["GG", 6],
                    ["HH", 7],
                    ["II", 1],
                    ["JJ", 0],
                ],
                flow: 21,
                valve: "JJ",
            },
        })
    })
})
