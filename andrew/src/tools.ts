export const sort = <T>(arr: T[], cb: (a: T, b: T) => number = (a, b) => (a < b ? -1 : 1)): T[] =>
    [...arr].sort(cb)

export const sum = ([n = 0, ...ns]: number[]): number => n + (ns.length && sum(ns))
