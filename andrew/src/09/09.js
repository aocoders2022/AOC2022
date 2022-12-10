export const countVisitedSquares = (motions, rope) =>
    Array.from(
        new Set(
            motions
                .map(({ direction, distance }) => Array(distance).fill({ direction, distance: 1 }))
                .flat()
                .reduce(
                    (ropes, motion) => [
                        ...ropes,
                        performPartialMotion(motion, ropes[ropes.length - 1]),
                    ],
                    [rope]
                )
                .map((rope) => rope.slice(-1))
                .map(([{ x, y }]) => `${x}_${y}`)
        )
    ).length

export const performMotion = ({ direction, distance }, rope) =>
    Array(distance).fill(null).reduce(performPartialMotion.bind(null, { direction }), rope)

export const performPartialMotion = ({ direction }, rope) =>
    rope.reduce(
        (movedRope, { x, y }, i) => [
            ...movedRope,
            !i
                ? {
                      x: x + (direction === "R" ? 1 : direction === "L" ? -1 : 0),
                      y: y + (direction === "U" ? 1 : direction === "D" ? -1 : 0),
                  }
                : Math.abs(movedRope[i - 1].x - x) > 1 || Math.abs(movedRope[i - 1].y - y) > 1
                ? {
                      x: x + (movedRope[i - 1].x > x ? 1 : movedRope[i - 1].x < x ? -1 : 0),
                      y: y + (movedRope[i - 1].y > y ? 1 : movedRope[i - 1].y < y ? -1 : 0),
                  }
                : { x, y },
        ],
        []
    )
