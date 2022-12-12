export const processPartialRound = (
    current,
    monkeys,
    reduceWorry = (item) => Math.floor(item / 3)
) => {
    const { falsey, items, operation, test, truthy } = monkeys.find((m) => m.monkey === current)

    const operatedItems = items.map(operation)
    const boredItems = operatedItems.map(reduceWorry)
    const truthyItems = boredItems.filter(test)
    const falseyItems = boredItems.filter((item) => !test(item))

    return monkeys.map((monkey) => {
        if (monkey.monkey === current) {
            return {
                ...monkey,
                items: [],
            }
        } else if (monkey.monkey === truthy) {
            return {
                ...monkey,
                items: [...monkey.items, ...truthyItems],
            }
        } else if (monkey.monkey === falsey) {
            return {
                ...monkey,
                items: [...monkey.items, ...falseyItems],
            }
        }

        return monkey
    })
}

export const processRound = (monkeys) =>
    monkeys.reduce(
        ([current, newMonkeys]) => [current + 1, processPartialRound(current, newMonkeys)],
        [0, monkeys]
    )[1]

export const processRounds = (rounds, monkeys) =>
    Array(rounds)
        .fill(null)
        .reduce((newMonkeys) => processRound(newMonkeys), monkeys)

export const findMonkeyBusinessLevel = (rounds, monkeys, reduceWorry) => {
    const base = monkeys.reduce((prev, monkey) => prev * monkey.divisible, 1)

    const processRound = (m, counters) =>
        m
            .reduce(
                ([current, newMonkeys, counters]) => [
                    current + 1,
                    processPartialRound(current, newMonkeys, (item) => item % base),
                    {
                        ...counters,
                        [current]:
                            (counters[current] || 0) +
                            newMonkeys.find(({ monkey }) => monkey === current).items.length,
                    },
                ],
                [0, m, counters]
            )
            .slice(1)

    const newMonkeys = Array(rounds)
        .fill(null)
        .reduce(
            ([newMonkeys, counters], _, i) => {
                // if (i === 18) {
                //     throw processPartialRound(0, newMonkeys)
                // }
                return processRound(newMonkeys, counters)
            },
            [monkeys, {}]
        )

    const [highest, secondHighest] = Object.values(newMonkeys[1]).sort((a, b) => b - a)

    return highest * secondHighest
}
