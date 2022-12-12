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
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ]
        )
    ).toEqual(1)

    expect(
        countVisitedSquares(
            [
                { direction: "R", distance: 5 },
                { direction: "U", distance: 8 },
                { direction: "L", distance: 8 },
                { direction: "D", distance: 3 },
                { direction: "R", distance: 17 },
                { direction: "D", distance: 10 },
                { direction: "L", distance: 25 },
                { direction: "U", distance: 20 },
            ],
            [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ]
        )
    ).toEqual(36)

    expect(
        countVisitedSquares(INPUT, [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
        ])
    ).toEqual(2467)
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

        expect(
            performMotion({ direction: "R", distance: 5 }, [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ])
        ).toEqual([
            { x: 5, y: 0 },
            { x: 4, y: 0 },
            { x: 3, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
        ])

        expect(
            performMotion({ direction: "U", distance: 8 }, [
                { x: 5, y: 0 },
                { x: 4, y: 0 },
                { x: 3, y: 0 },
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ])
        ).toEqual([
            { x: 5, y: 8 },
            { x: 5, y: 7 },
            { x: 5, y: 6 },
            { x: 5, y: 5 },
            { x: 5, y: 4 },
            { x: 4, y: 4 },
            { x: 3, y: 3 },
            { x: 2, y: 2 },
            { x: 1, y: 1 },
            { x: 0, y: 0 },
        ])

        expect(
            performMotion({ direction: "L", distance: 8 }, [
                { x: 5, y: 8 },
                { x: 5, y: 7 },
                { x: 5, y: 6 },
                { x: 5, y: 5 },
                { x: 5, y: 4 },
                { x: 4, y: 4 },
                { x: 3, y: 3 },
                { x: 2, y: 2 },
                { x: 1, y: 1 },
                { x: 0, y: 0 },
            ])
        ).toEqual([
            { x: -3, y: 8 },
            { x: -2, y: 8 },
            { x: -1, y: 8 },
            { x: 0, y: 8 },
            { x: 1, y: 8 },
            { x: 1, y: 7 },
            { x: 1, y: 6 },
            { x: 1, y: 5 },
            { x: 1, y: 4 },
            { x: 1, y: 3 },
        ])

        expect(
            performMotion({ direction: "D", distance: 3 }, [
                { x: -3, y: 8 },
                { x: -2, y: 8 },
                { x: -1, y: 8 },
                { x: 0, y: 8 },
                { x: 1, y: 8 },
                { x: 1, y: 7 },
                { x: 1, y: 6 },
                { x: 1, y: 5 },
                { x: 1, y: 4 },
                { x: 1, y: 3 },
            ])
        ).toEqual([
            { x: -3, y: 5 },
            { x: -3, y: 6 },
            { x: -2, y: 7 },
            { x: -1, y: 7 },
            { x: 0, y: 7 },
            { x: 1, y: 7 },
            { x: 1, y: 6 },
            { x: 1, y: 5 },
            { x: 1, y: 4 },
            { x: 1, y: 3 },
        ])

        expect(
            performMotion({ direction: "R", distance: 17 }, [
                { x: -3, y: 5 },
                { x: -3, y: 6 },
                { x: -2, y: 7 },
                { x: -1, y: 7 },
                { x: 0, y: 7 },
                { x: 1, y: 7 },
                { x: 1, y: 6 },
                { x: 1, y: 5 },
                { x: 1, y: 4 },
                { x: 1, y: 3 },
            ])
        ).toEqual([
            { x: 14, y: 5 },
            { x: 13, y: 5 },
            { x: 12, y: 5 },
            { x: 11, y: 5 },
            { x: 10, y: 5 },
            { x: 9, y: 5 },
            { x: 8, y: 5 },
            { x: 7, y: 5 },
            { x: 6, y: 5 },
            { x: 5, y: 5 },
        ])

        expect(
            performMotion({ direction: "D", distance: 10 }, [
                { x: 14, y: 5 },
                { x: 13, y: 5 },
                { x: 12, y: 5 },
                { x: 11, y: 5 },
                { x: 10, y: 5 },
                { x: 9, y: 5 },
                { x: 8, y: 5 },
                { x: 7, y: 5 },
                { x: 6, y: 5 },
                { x: 5, y: 5 },
            ])
        ).toEqual([
            { x: 14, y: -5 },
            { x: 14, y: -4 },
            { x: 14, y: -3 },
            { x: 14, y: -2 },
            { x: 14, y: -1 },
            { x: 14, y: 0 },
            { x: 13, y: 0 },
            { x: 12, y: 0 },
            { x: 11, y: 0 },
            { x: 10, y: 0 },
        ])

        expect(
            performMotion({ direction: "L", distance: 25 }, [
                { x: 14, y: -5 },
                { x: 14, y: -4 },
                { x: 14, y: -3 },
                { x: 14, y: -2 },
                { x: 14, y: -1 },
                { x: 14, y: 0 },
                { x: 13, y: 0 },
                { x: 12, y: 0 },
                { x: 11, y: 0 },
                { x: 10, y: 0 },
            ])
        ).toEqual([
            { x: -11, y: -5 },
            { x: -10, y: -5 },
            { x: -9, y: -5 },
            { x: -8, y: -5 },
            { x: -7, y: -5 },
            { x: -6, y: -5 },
            { x: -5, y: -5 },
            { x: -4, y: -5 },
            { x: -3, y: -5 },
            { x: -2, y: -5 },
        ])

        expect(
            performMotion({ direction: "L", distance: 25 }, [
                { x: -11, y: -5 },
                { x: -10, y: -5 },
                { x: -9, y: -5 },
                { x: -8, y: -5 },
                { x: -7, y: -5 },
                { x: -6, y: -5 },
                { x: -5, y: -5 },
                { x: -4, y: -5 },
                { x: -3, y: -5 },
                { x: -2, y: -5 },
            ])
        ).toEqual([
            { x: -36, y: -5 },
            { x: -35, y: -5 },
            { x: -34, y: -5 },
            { x: -33, y: -5 },
            { x: -32, y: -5 },
            { x: -31, y: -5 },
            { x: -30, y: -5 },
            { x: -29, y: -5 },
            { x: -28, y: -5 },
            { x: -27, y: -5 },
        ])
    })
})
