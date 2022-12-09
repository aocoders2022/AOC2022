const isTooFar = ({ headX, headY }, { tailX, tailY }) =>
    Math.abs(headX - tailX) > 1 || Math.abs(headY - tailY) > 1

const performPartialMotion = ({ direction }, { headX, headY, tailX, tailY }) => {
    if (direction === "R" || direction === "L") {
        const newHead = { headX: headX + (direction === "R" ? 1 : -1), headY }

        return isTooFar(newHead, { tailX, tailY })
            ? { ...newHead, tailX: newHead.headX + (direction === "R" ? -1 : 1), tailY: headY }
            : { ...newHead, tailX, tailY }
    }

    if (direction === "U" || direction === "D") {
        const newHead = { headX, headY: headY + (direction === "U" ? 1 : -1) }

        return isTooFar(newHead, { tailX, tailY })
            ? { ...newHead, tailX: headX, tailY: newHead.headY + (direction === "U" ? -1 : 1) }
            : { ...newHead, tailX, tailY }
    }

    return { headX, headY, tailX, tailY }
}

export const performMotion = ({ direction, distance }, position) =>
    Array(distance).fill(null).reduce(performPartialMotion.bind(null, { direction }), position)

export const countVisitedSquares = (motions, position) =>
    Array.from(
        new Set(
            motions
                .map(({ direction, distance }) => Array(distance).fill({ direction, distance: 1 }))
                .flat()
                .reduce(
                    (positions, motion) => [
                        ...positions,
                        performPartialMotion(motion, positions[positions.length - 1]),
                    ],
                    [position]
                )
                .map(({ tailX, tailY }) => `${tailX}_${tailY}`)
        )
    ).length
