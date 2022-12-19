import {
    countExteriorSurfaces,
    countUnconnectedSurfaces,
    getSiblings,
    getTrappedPockets,
    isEnclosed,
    parseDropletScan,
    plotDropletScan,
} from "@/18/18"
import { readFileSync } from "fs"
import { resolve } from "path"

const EXAMPLE = String(readFileSync(resolve(__dirname, "18.example.txt")))

const INPUT = String(readFileSync(resolve(__dirname, "18.input.txt")))

describe("countExteriorSurfaces", () => {
    it("should return the exterior surface area in a plotted droplet scan", () => {
        expect(
            countExteriorSurfaces(plotDropletScan(parseDropletScan(EXAMPLE), new Set()))
        ).toEqual(58)

        expect(countExteriorSurfaces(plotDropletScan(parseDropletScan(INPUT), new Set()))).toEqual(
            2486
        )
    })
})

describe("countUnconnectedSurfaces", () => {
    it("should return the unconnected surface area in a plotted droplet scan", () => {
        expect(
            countUnconnectedSurfaces(plotDropletScan(parseDropletScan(EXAMPLE), new Set()))
        ).toEqual(64)

        expect(
            countUnconnectedSurfaces(plotDropletScan(parseDropletScan(INPUT), new Set()))
        ).toEqual(4418)

        expect(
            countUnconnectedSurfaces(
                plotDropletScan(
                    [
                        { x: 1, y: 1, z: 1 },
                        { x: 2, y: 1, z: 1 },
                        { x: 2, y: 2, z: 1 },
                        { x: 1, y: 1, z: 2 },
                        { x: 1, y: 2, z: 2 },
                        { x: 2, y: 2, z: 2 },
                    ],
                    new Set()
                )
            )
        ).toEqual(24)
    })
})

describe("getSiblings", () => {
    it("should return the sibling coordinates", () => {
        expect(getSiblings({ x: 1, y: 2, z: 3 })).toEqual([
            { x: 1, y: 3, z: 3 },
            { x: 1, y: 1, z: 3 },
            { x: 2, y: 2, z: 3 },
            { x: 0, y: 2, z: 3 },
            { x: 1, y: 2, z: 4 },
            { x: 1, y: 2, z: 2 },
        ])
    })
})

describe("getTrappedPockets", () => {
    it("should return the trapped pockets in a plotted droplet scan", () => {
        expect(getTrappedPockets(plotDropletScan(parseDropletScan(EXAMPLE), new Set()))).toEqual(
            new Set(["2,2,5"])
        )

        const cube5 = Array.from(Array(5), (_, i) => i).flatMap((x) =>
            Array.from(Array(5), (_, j) => j).flatMap((y) =>
                Array.from(Array(5), (_, k) => k).map((z) => ({ x, y, z }))
            )
        )

        expect(getTrappedPockets(plotDropletScan(cube5, new Set()))).toEqual(new Set())

        expect(
            getTrappedPockets(
                plotDropletScan(
                    cube5.filter(({ x, y, z }) => x !== 2 || y !== 2 || z !== 2),
                    new Set()
                )
            )
        ).toEqual(new Set(["2,2,2"]))

        expect(
            getTrappedPockets(
                plotDropletScan(
                    cube5.filter(
                        ({ x, y, z }) =>
                            x === 0 || y == 0 || z === 0 || x === 4 || y == 4 || z === 4
                    ),
                    new Set()
                )
            )
        ).toEqual(
            new Set([
                "1,1,1",
                "2,1,1",
                "3,1,1",
                "1,2,1",
                "2,2,1",
                "3,2,1",
                "1,3,1",
                "2,3,1",
                "3,3,1",
                "1,1,2",
                "2,1,2",
                "3,1,2",
                "1,2,2",
                "2,2,2",
                "3,2,2",
                "1,3,2",
                "2,3,2",
                "3,3,2",
                "1,1,3",
                "2,1,3",
                "3,1,3",
                "1,2,3",
                "2,2,3",
                "3,2,3",
                "1,3,3",
                "2,3,3",
                "3,3,3",
            ])
        )

        expect(
            getTrappedPockets(
                plotDropletScan(
                    cube5.filter(
                        ({ x, y, z }) =>
                            ![
                                "1,1,1",
                                "2,1,1",
                                "3,1,1",
                                "3,2,1",
                                "3,3,1",
                                "2,3,1",
                                "1,3,1",
                            ].includes(`${x},${y},${z}`)
                    ),
                    new Set()
                )
            )
        ).toEqual(new Set(["1,1,1", "2,1,1", "3,1,1", "3,2,1", "3,3,1", "2,3,1", "1,3,1"]))

        expect(
            getTrappedPockets(
                plotDropletScan(
                    cube5.filter(
                        ({ x, y, z }) =>
                            ![
                                "1,1,1",
                                "2,1,1",
                                "3,1,1",
                                "3,2,1",
                                "3,3,1",
                                "2,3,1",
                                "1,3,1",
                                "0,3,1",
                            ].includes(`${x},${y},${z}`)
                    ),
                    new Set()
                )
            )
        ).toEqual(new Set())
    })
})

describe("isEnclosed", () => {
    it("should return true for a coordinate that is enclosed", () => {
        const cube5 = Array.from(Array(5), (_, i) => i).flatMap((x) =>
            Array.from(Array(5), (_, j) => j).flatMap((y) =>
                Array.from(Array(5), (_, k) => k).map((z) => ({ x, y, z }))
            )
        )

        expect(
            isEnclosed(
                { x: 2, y: 2, z: 2 },
                cube5.filter(
                    ({ x, y, z }) => x === 0 || y == 0 || z === 0 || x === 4 || y == 4 || z === 4
                )
            )
        ).toEqual(true)
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
