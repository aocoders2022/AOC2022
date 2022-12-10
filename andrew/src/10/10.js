export const completeCycle = ([cycle, { x }], { action, value }) =>
    action === "addx" ? [cycle + 2, { x: x + value }] : [cycle + 1, { x }]

export const completeProgram = (instructions, [cycle, { x }]) =>
    instructions.reduce(completeCycle, [cycle, { x }])

export const findCycle = (instructions, [cycle, { x }], at) =>
    instructions.reduce(
        (current, { action, value }) => {
            if (current[0] === at) {
                return current
            }

            const nextCurrent = completeCycle(current, { action, value })

            if (nextCurrent[0] > at) {
                return current
            }

            return nextCurrent
        },
        [cycle, { x }]
    )

export const findSignalStrength = (instructions, [cycle, { x }], at) =>
    instructions.reduce(
        (current, { action, value }) => {
            if (current[0] === at) {
                return current
            }

            const nextCurrent = completeCycle(current, { action, value })

            if (nextCurrent[0] > at) {
                return current
            }

            return nextCurrent
        },
        [cycle, { x }]
    )[1].x * at

export const renderCRT = (instructions, [cycle, { x }]) => {
    const screen = Array(6)
        .fill(null)
        .map((_, i) =>
            Array(40)
                .fill(null)
                .map((_, j) => [j, i * 40 + j + 1])
        )

    return (
        "\n" +
        screen
            .map((line, j) =>
                line
                    .map(([i, pixel]) => {
                        const pixelCycle = pixel

                        const atCycle = findCycle(instructions, [cycle, { x }], pixelCycle)

                        if (
                            atCycle[1].x === i ||
                            atCycle[1].x + 1 === i ||
                            atCycle[1].x - 1 === i
                        ) {
                            return "#"
                        }

                        return "."
                    })
                    .join("")
            )
            .join("\n")
    )
}

export const sumSignalStrengths = (instructions, [cycle, { x }], ats) =>
    ats.map(findSignalStrength.bind(null, instructions, [cycle, { x }])).reduce((a, b) => a + b)
