import { countVisitedSquares, performMotion } from "@/09/09"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "09.input.txt")))
    .split("\n")
    .map((line) => line.split(" "))
    .map(([direction, distance]) => ({ direction, distance: Number(distance) }))

describe("countVisitedSquares", () => {
    expect(
        countVisitedSquares(
            [
                { direction: "R", distance: 4 },
                { direction: "U", distance: 4 },
                { direction: "L", distance: 3 },
                { direction: "D", distance: 1 },
                { direction: "R", distance: 4 },
                { direction: "D", distance: 1 },
                { direction: "L", distance: 5 },
                { direction: "R", distance: 2 },
            ],
            [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ]
        )
    ).toEqual(13)

    expect(
        countVisitedSquares(INPUT, [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
        ])
    ).toEqual(5874)
})

describe("performMotion", () => {
    it("should return the new rope after performing the motion", () => {
        expect(
            performMotion({ direction: "R", distance: 4 }, [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ])
        ).toEqual([
            { x: 4, y: 0 },
            { x: 3, y: 0 },
        ])

        expect(
            performMotion({ direction: "U", distance: 4 }, [
                { x: 4, y: 0 },
                { x: 3, y: 0 },
            ])
        ).toEqual([
            { x: 4, y: 4 },
            { x: 4, y: 3 },
        ])

        expect(
            performMotion({ direction: "L", distance: 3 }, [
                { x: 4, y: 4 },
                { x: 4, y: 3 },
            ])
        ).toEqual([
            { x: 1, y: 4 },
            { x: 2, y: 4 },
        ])

        expect(
            performMotion({ direction: "D", distance: 1 }, [
                { x: 1, y: 4 },
                { x: 2, y: 4 },
            ])
        ).toEqual([
            { x: 1, y: 3 },
            { x: 2, y: 4 },
        ])

        expect(
            performMotion({ direction: "R", distance: 4 }, [
                { x: 1, y: 3 },
                { x: 2, y: 4 },
            ])
        ).toEqual([
            { x: 5, y: 3 },
            { x: 4, y: 3 },
        ])

        expect(
            performMotion({ direction: "D", distance: 1 }, [
                { x: 5, y: 3 },
                { x: 4, y: 3 },
            ])
        ).toEqual([
            { x: 5, y: 2 },
            { x: 4, y: 3 },
        ])

        expect(
            performMotion({ direction: "L", distance: 5 }, [
                { x: 5, y: 2 },
                { x: 4, y: 3 },
            ])
        ).toEqual([
            { x: 0, y: 2 },
            { x: 1, y: 2 },
        ])

        expect(
            performMotion({ direction: "R", distance: 2 }, [
                { x: 0, y: 2 },
                { x: 1, y: 2 },
            ])
        ).toEqual([
            { x: 2, y: 2 },
            { x: 1, y: 2 },
        ])
    })
})
