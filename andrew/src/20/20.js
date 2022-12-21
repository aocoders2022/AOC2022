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
        .reduce((newSequence, number) => {
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
        }, initialSequence)
        .map((number) => number + 0)
}

export const moveBackwards = (sequence, number) => {
    const index = sequence.indexOf(number)
    const newIndex = index + number

    const adjustIndex = (i, seq) => {
        const newI = seq.length + i

        if (newI < 0) return adjustIndex(newI, seq)

        return newI
    }

    const adjustedNewIndex = newIndex >= 0 ? newIndex : adjustIndex(newIndex, sequence)

    const sequenceWithoutNumber = [...sequence.slice(0, index), ...sequence.slice(index + 1)]

    if (adjustedNewIndex !== newIndex) {
        return [
            ...sequenceWithoutNumber.slice(0, adjustedNewIndex - 1),
            number,
            ...sequenceWithoutNumber.slice(adjustedNewIndex - 1),
        ]
    }

    if (newIndex === 0) {
        return [...sequenceWithoutNumber, number]
    }

    return [
        ...sequenceWithoutNumber.slice(0, newIndex),
        number,
        ...sequenceWithoutNumber.slice(newIndex),
    ]
}

export const moveForwards = (sequence, number) => {
    const index = sequence.indexOf(number)
    const newIndex = index + number
    const adjustedNewIndex = newIndex % sequence.length

    const sequenceWithoutNumber = [...sequence.slice(0, index), ...sequence.slice(index + 1)]

    if (adjustedNewIndex !== newIndex) {
        return [
            ...sequenceWithoutNumber.slice(0, adjustedNewIndex + 1),
            number,
            ...sequenceWithoutNumber.slice(adjustedNewIndex + 1),
        ]
    }

    if (newIndex === sequence.length - 1) {
        return [number, ...sequenceWithoutNumber]
    }

    return [
        ...sequenceWithoutNumber.slice(0, newIndex),
        number,
        ...sequenceWithoutNumber.slice(newIndex),
    ]
}
