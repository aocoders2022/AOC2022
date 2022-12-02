export const sum = ([n = 0, ...ns]: number[]): number => n + (ns.length && sum(ns))
