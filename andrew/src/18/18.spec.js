import { countUnconnectedSurfaces, parseDropletScan, plotDropletScan } from "@/18/18"
import { readFileSync } from "fs"
import { resolve } from "path"

const EXAMPLE = String(readFileSync(resolve(__dirname, "18.example.txt")))

const INPUT = String(readFileSync(resolve(__dirname, "18.input.txt")))

describe("countUnconnectedSurfaces", () => {
    it("should return the unconnected surface area in a plotted droplet scan", () => {
        expect(
            countUnconnectedSurfaces(plotDropletScan(parseDropletScan(EXAMPLE), new Set()))
        ).toEqual(64)

        expect(
            countUnconnectedSurfaces(plotDropletScan(parseDropletScan(INPUT), new Set()))
        ).toEqual(4418)
    })
})

describe("parseDropletScan", () => {
    it("should return the parsed droplet scan", () => {
        expect(parseDropletScan("1,1,1\n2,1,1")).toEqual([
            { x: 1, y: 1, z: 1 },
            { x: 2, y: 1, z: 1 },
        ])

        expect(parseDropletScan(EXAMPLE)).toEqual([
            { x: 2, y: 2, z: 2 },
            { x: 1, y: 2, z: 2 },
            { x: 3, y: 2, z: 2 },
            { x: 2, y: 1, z: 2 },
            { x: 2, y: 3, z: 2 },
            { x: 2, y: 2, z: 1 },
            { x: 2, y: 2, z: 3 },
            { x: 2, y: 2, z: 4 },
            { x: 2, y: 2, z: 6 },
            { x: 1, y: 2, z: 5 },
            { x: 3, y: 2, z: 5 },
            { x: 2, y: 1, z: 5 },
            { x: 2, y: 3, z: 5 },
        ])
    })
})

describe("plotDropletScan", () => {
    it("should return the grid with the droplet scan plotted on it", () => {
        expect(plotDropletScan(parseDropletScan(EXAMPLE), new Set())).toEqual(
            new Set([
                "2,2,2",
                "1,2,2",
                "3,2,2",
                "2,1,2",
                "2,3,2",
                "2,2,1",
                "2,2,3",
                "2,2,4",
                "2,2,6",
                "1,2,5",
                "3,2,5",
                "2,1,5",
                "2,3,5",
            ])
        )
    })
})
