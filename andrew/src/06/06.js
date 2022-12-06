import { __, addIndex, findIndex, nthArg, pipe, propEq, slice, split, takeLast, uniq } from "ramda"

export const findStartOfMarkerIndex = (characters, size = 4) =>
    addIndex(findIndex)(
        pipe(nthArg(1), slice(0, __, characters), takeLast(size), uniq, propEq("length", size)),
        split("", characters)
    )
