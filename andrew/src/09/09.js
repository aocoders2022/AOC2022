export const performMotion = ({ direction, distance }, rope) =>
    Array(distance).fill(null).reduce(performPartialMotion.bind(null, { direction }), rope)

export const performPartialMotion = ({ direction }, [head, tail]) => {
    const isTooFar = (head, tail) => Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1

    if (direction === "R" || direction === "L") {
        const newHead = { x: head.x + (direction === "R" ? 1 : -1), y: head.y }

        return isTooFar(newHead, tail)
            ? [newHead, { x: newHead.x + (direction === "R" ? -1 : 1), y: head.y }]
            : [newHead, tail]
    }

    if (direction === "U" || direction === "D") {
        const newHead = { x: head.x, y: head.y + (direction === "U" ? 1 : -1) }

        return isTooFar(newHead, tail)
            ? [newHead, { x: head.x, y: newHead.y + (direction === "U" ? -1 : 1) }]
            : [newHead, tail]
    }
}

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
