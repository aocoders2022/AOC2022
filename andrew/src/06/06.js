import {
    __,
    addIndex,
    equals,
    findIndex,
    length,
    nthArg,
    pipe,
    slice,
    split,
    takeLast,
    uniq,
} from "ramda"

export const findStartOfMarkerIndex = (characters, size = 4) =>
    addIndex(findIndex)(
        pipe(nthArg(1), slice(0, __, characters), takeLast(size), uniq, length, equals(size)),
        split("", characters)
    )
