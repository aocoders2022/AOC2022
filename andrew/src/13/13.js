const compare = (left, right, result) => {
    const isLeftNumber = Number.isInteger(left)
    const isRightNumber = Number.isInteger(right)

    const isLeftList = Array.isArray(left)
    const isRightList = Array.isArray(right)

    const isMixed = (isLeftList && isRightNumber) || (isRightList && isLeftNumber)

    if (isLeftNumber && isRightNumber) {
        if (left < right) {
            result.isOrdered = true
            return
        }

        if (left > right) {
            result.isOrdered = false
            return
        }
    }

    if (isLeftList && isRightList) {
        const longest = left.length > right.length ? left : right

        for (let i = 0; i < longest.length; i++) {
            const l = left[i]
            const r = right[i]

            if (left[i] === undefined) {
                result.isOrdered = true
            } else if (right[i] === undefined) {
                result.isOrdered = false
            } else {
                compare(left[i], right[i], result)
            }

            if (result.isOrdered !== null) {
                return
            }
        }
    }

    if (isMixed) {
        const l = isLeftList ? left : [left]
        const r = isRightList ? right : [right]

        compare(l, r, result)
    }
}

export const isCorrectPacketOrder = (left, right) => {
    const result = { isOrdered: null }

    compare(left, right, result)

    return result.isOrdered
}

export const countPaired = (pairs) => {
    return pairs
        .map(([left, right]) => isCorrectPacketOrder(left, right))
        .reduce((count, bool, i) => {
            if (bool) {
                return count + (i + 1)
            }

            return count
        }, 0)
}
