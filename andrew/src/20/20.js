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

export const mixFileTimes = (times, sequence) => {
    const initialSequence = sequence.map((number) => new Number(number))

    const mixFile = (newSequence) => {
        return initialSequence.reduce((newSequence, number) => {
            if (number === 0) {
                return newSequence
            }

            const index = newSequence.indexOf(number)
            const newIndex = index + number
            const sequenceWithoutNumber = [
                ...newSequence.slice(0, index),
                ...newSequence.slice(index + 1),
            ]
            const adjustedNewIndex = newIndex % sequenceWithoutNumber.length

            return [
                ...sequenceWithoutNumber.slice(0, adjustedNewIndex),
                number,
                ...sequenceWithoutNumber.slice(adjustedNewIndex),
            ]
        }, newSequence)
    }

    return Array.from(Array(times), (_, i) => i)
        .reduce(mixFile, initialSequence)
        .map((number) => number + 0)
}
