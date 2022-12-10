export const completeCycle = ([cycle, { x }], { action, value }) =>
    action === "addx" ? [cycle + 2, { x: x + value }] : [cycle + 1, { x }]

export const completeProgram = (instructions, [cycle, { x }]) =>
    instructions.reduce(completeCycle, [cycle, { x }])

export const findSignalStrength = (at, instructions, [cycle, { x }]) => {
    const [, value] = instructions.reduce(
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

    return value.x * at
}

export const sumSignalStrengths = (ats, instructions, [cycle, { x }]) =>
    ats.map((at) => findSignalStrength(at, instructions, [cycle, { x }])).reduce((a, b) => a + b)
