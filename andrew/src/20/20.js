export const getGroveCoordinates = (sequence) => {
    const getGroveCoordinateValue = (index) =>
        sequence[(sequence.indexOf(0) + index) % sequence.length]

    return (
        getGroveCoordinateValue(1000) +
        getGroveCoordinateValue(2000) +
        getGroveCoordinateValue(3000)
    )
}

export const mixFile = (sequence) => {
    const initialSequence = sequence.map((number) => new Number(number))

    return initialSequence
        .reduce(
            (newSequence, number, index) => {
                if (number === 0) {
                    return newSequence
                }

                if (number > 0) {
                    return moveForwards(newSequence, number)
                }

                if (number < 0) {
                    return moveBackwards(newSequence, number)
                }

                return newSequence
            },
            [...initialSequence]
        )
        .map((number) => number + 0)
}

const jumpBack = (sequence, number) => {
    const index = sequence.indexOf(number)
    const newIndex = index - 1

    const sequenceWithoutNumber = [...sequence.slice(0, index), ...sequence.slice(index + 1)]

    if (newIndex === 0) {
        return [...sequenceWithoutNumber, number]
    }

    return [
        ...sequenceWithoutNumber.slice(0, newIndex),
        number,
        ...sequenceWithoutNumber.slice(newIndex),
    ]
}

const jumpForward = (sequence, number) => {
    const index = sequence.indexOf(number)
    const newIndex = index + 1

    const sequenceWithoutNumber = [...sequence.slice(0, index), ...sequence.slice(index + 1)]

    if (newIndex === sequence.length - 1) {
        // this rule could be wrong
        return [number, ...sequenceWithoutNumber]
    }

    return [
        ...sequenceWithoutNumber.slice(0, newIndex),
        number,
        ...sequenceWithoutNumber.slice(newIndex),
    ]
}

export const moveBackwards = (sequence, number) =>
    Array.from(Array(Math.abs(number)), (_, i) => i).reduce(
        (newSequence) => jumpBack(newSequence, number),
        [...sequence]
    )

export const moveForwards = (sequence, number) =>
    Array.from(Array(Math.abs(number)), (_, i) => i).reduce(
        (newSequence) => jumpForward(newSequence, number),
        [...sequence]
    )
