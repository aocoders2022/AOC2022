const isTooFar = ({ headX, headY }, { tailX, tailY }) => {
    return Math.abs(headX - tailX) > 1 || Math.abs(headY - tailY) > 1
}

const performPartialMotion = ({ direction }, { headX, headY, tailX, tailY }) => {
    if (direction === "R" || direction === "L") {
        const distance = direction === "R" ? 1 : -1
        const adjustment = direction === "R" ? -1 : 1

        const newHead = {
            headX: headX + distance,
            headY,
        }

        const oldTail = {
            tailX,
            tailY,
        }

        if (isTooFar(newHead, oldTail)) {
            return {
                ...newHead,
                tailX: newHead.headX + adjustment,
                tailY: headY,
            }
        }

        return {
            ...newHead,
            ...oldTail,
        }
    }

    if (direction === "U" || direction === "D") {
        const distance = direction === "U" ? 1 : -1
        const adjustment = direction === "U" ? -1 : 1

        const newHead = {
            headX,
            headY: headY + distance,
        }

        const oldTail = {
            tailX,
            tailY,
        }

        if (isTooFar(newHead, oldTail)) {
            return {
                ...newHead,
                tailX: headX,
                tailY: newHead.headY + adjustment,
            }
        }

        return {
            ...newHead,
            ...oldTail,
        }
    }

    return { headX, headY, tailX, tailY }
}

export const performMotion = (position, { direction, distance }) =>
    Array(distance).fill(null).reduce(performPartialMotion.bind(null, { direction }), position)

export const countVisitedSquares = (motions, position) => {
    const singleMotions = motions
        .map(({ direction, distance }) => Array(distance).fill({ direction, distance: 1 }))
        .flat()

    const trail = singleMotions.reduce(
        (positions, motion) => [
            ...positions,
            performPartialMotion(motion, positions[positions.length - 1]),
        ],
        [position]
    )

    const tails = trail.map(({ tailX, tailY }) => `${tailX}_${tailY}`)
    const dedupedTails = Array.from(new Set(tails))

    return dedupedTails.length
}
