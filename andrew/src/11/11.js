export const processPartialRound = (current, monkeys, onInspect = () => {}) => {
    const { falsey, items, operation, test, truthy } = monkeys.find((m) => m.monkey === current)

    onInspect(current, items.length)

    const operatedItems = items.map(operation)
    const boredItems = operatedItems.map((item) => Math.floor(item / 3))
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

export const processRound = (monkeys, onInspect = () => {}) =>
    monkeys.reduce(
        ([current, newMonkeys]) => [
            current + 1,
            processPartialRound(current, newMonkeys, onInspect),
        ],
        [0, monkeys]
    )[1]

export const processRounds = (rounds, monkeys) =>
    Array(rounds)
        .fill(null)
        .reduce((newMonkeys) => processRound(newMonkeys), monkeys)

export const findMonkeyBusinessLevel = (rounds, monkeys) => {
    const counters = {}

    Array(rounds)
        .fill(null)
        .reduce((newMonkeys) => {
            return processRound(newMonkeys, (id, count) => {
                counters[id] = (counters[id] || 0) + count
            })
        }, monkeys)

    const [highest, secondHighest] = Object.values(counters).sort((a, b) => b - a)

    return highest * secondHighest
}
