import { countVisitedSquares, performMotion } from "@/09/09"
import { readFileSync } from "fs"
import { resolve } from "path"
import { applySpec, map, nth, pipe, split } from "ramda"

const INPUT = map(
    pipe(split(" "), applySpec({ direction: nth(0), distance: pipe(nth(1), Number) })),
    split("\n", String(readFileSync(resolve(__dirname, "09.input.txt"))))
)

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
            { headX: 0, headY: 0, tailX: 0, tailY: 0 }
        )
    ).toEqual(13)

    expect(countVisitedSquares(INPUT, { headX: 0, headY: 0, tailX: 0, tailY: 0 })).toEqual(5874)
})

describe("performMotion", () => {
    it("should return the new position after performing the motion", () => {
        expect(
            performMotion(
                { headX: 0, headY: 0, tailX: 0, tailY: 0 },
                { direction: "R", distance: 4 }
            )
        ).toEqual({ headX: 4, headY: 0, tailX: 3, tailY: 0 })

        expect(
            performMotion(
                { headX: 4, headY: 0, tailX: 3, tailY: 0 },
                { direction: "U", distance: 4 }
            )
        ).toEqual({ headX: 4, headY: 4, tailX: 4, tailY: 3 })

        expect(
            performMotion(
                { headX: 4, headY: 4, tailX: 4, tailY: 3 },
                { direction: "L", distance: 3 }
            )
        ).toEqual({ headX: 1, headY: 4, tailX: 2, tailY: 4 })

        expect(
            performMotion(
                { headX: 1, headY: 4, tailX: 2, tailY: 4 },
                { direction: "D", distance: 1 }
            )
        ).toEqual({ headX: 1, headY: 3, tailX: 2, tailY: 4 })

        expect(
            performMotion(
                { headX: 1, headY: 3, tailX: 2, tailY: 4 },
                { direction: "R", distance: 4 }
            )
        ).toEqual({ headX: 5, headY: 3, tailX: 4, tailY: 3 })

        expect(
            performMotion(
                { headX: 5, headY: 3, tailX: 4, tailY: 3 },
                { direction: "D", distance: 1 }
            )
        ).toEqual({ headX: 5, headY: 2, tailX: 4, tailY: 3 })

        expect(
            performMotion(
                { headX: 5, headY: 2, tailX: 4, tailY: 3 },
                { direction: "L", distance: 5 }
            )
        ).toEqual({ headX: 0, headY: 2, tailX: 1, tailY: 2 })

        expect(
            performMotion(
                { headX: 0, headY: 2, tailX: 1, tailY: 2 },
                { direction: "R", distance: 2 }
            )
        ).toEqual({ headX: 2, headY: 2, tailX: 1, tailY: 2 })
    })
})
