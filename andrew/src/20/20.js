export const applyDecryptionKey = (sequence) => sequence.map((number) => number * 811589153)

export const getGroveCoordinates = (sequence) => {
    const getGroveCoordinateValue = (index) =>
        sequence[(sequence.indexOf(0) + index) % sequence.length]

    return (
        getGroveCoordinateValue(1000) +
        getGroveCoordinateValue(2000) +
        getGroveCoordinateValue(3000)
    )
}

const mixFile = (sequence, initialSequence = sequence.map((number) => new Number(number))) =>
    initialSequence
        .reduce((newSequence, number) => {
            if (number === 0) {
                return newSequence
            }

            if (number >= 0) {
                throw moveForwards(newSequence, number).map((a) => +a)
                return moveForwards(newSequence, number)
            }

            if (number < 0) {
                return moveBackwards(newSequence, number)
            }

            return newSequence
        }, initialSequence)
        .map((number) => number + 0)

export const mixFileTimes = (times, sequence) => {
    const initialSequence = sequence.map((number) => new Number(number))

    return Array.from(Array(times), (_, i) => i).reduce(
        (newSequence) => mixFile(newSequence, initialSequence),
        initialSequence
    )
}

export const moveBackwards = (sequence, number) => {
    const index = sequence.indexOf(number)

    const newIndex = index + number

    const divisions = Math.floor(newIndex / sequence.length)
    const adjustedNewIndex =
        newIndex >= 0 ? newIndex : sequence.length + ((newIndex % sequence.length) + divisions)

    const sequenceWithoutNumber = [...sequence.slice(0, index), ...sequence.slice(index + 1)]

    if (adjustedNewIndex !== newIndex) {
        if (adjustedNewIndex === 0) {
            return [number, ...sequenceWithoutNumber]
        }

        return [
            ...sequenceWithoutNumber.slice(0, adjustedNewIndex),
            number,
            ...sequenceWithoutNumber.slice(adjustedNewIndex),
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
    const divisions = Math.floor(newIndex / sequence.length)
    const adjustedNewIndex = (newIndex % sequence.length) + divisions

    const sequenceWithoutNumber = [...sequence.slice(0, index), ...sequence.slice(index + 1)]

    if (adjustedNewIndex !== newIndex) {
        if (adjustedNewIndex === sequence.length - 1) {
            return [number, ...sequenceWithoutNumber]
        }

        return [
            ...sequenceWithoutNumber.slice(0, adjustedNewIndex),
            number,
            ...sequenceWithoutNumber.slice(adjustedNewIndex),
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
