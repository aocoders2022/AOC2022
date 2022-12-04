import { count } from "ramda"

export const areRangesFullyOverlapping = ([[fromA, toA], [fromB, toB]]) =>
    (fromA >= fromB && toA <= toB) || (fromB >= fromA && toB <= toA)

export const areRangesPartiallyOverlapping = ([[fromA, toA], [fromB, toB]]) =>
    (fromA >= fromB && fromA <= toB) || (fromB >= fromA && fromB <= toA)

export const countOverlappingRanges = (ranges, isOverlapping = areRangesFullyOverlapping) =>
    count(isOverlapping, ranges)
