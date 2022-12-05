import {
    addIndex,
    curry,
    filter,
    gt,
    identity,
    join,
    lte,
    map,
    nth,
    nthArg,
    pipe,
    reverse,
} from "ramda"

const applyMove = ([count, from, to], stacks, transformation, stack, i) =>
    i === from - 1
        ? addIndex(filter)(pipe(nthArg(1), lte(count)), stack)
        : i === to - 1
        ? [
              ...transformation(
                  reverse(addIndex(filter)(pipe(nthArg(1), gt(count)), stacks[from - 1]))
              ),
              ...stack,
          ]
        : stack

export const crateMover9000 = ([count, from, to], stacks, transformation = identity) =>
    addIndex(map)(curry(applyMove)([count, from, to], stacks, transformation), stacks)

export const crateMover9001 = ([count, from, to], stacks) =>
    crateMover9000([count, from, to], stacks, reverse)

export const findTopCrates = (stacks) => join("", map(nth(0), stacks))

export const performMoves = ([move, ...moves], stacks, performMove = crateMover9000) =>
    move ? performMoves(moves, performMove(move, stacks), performMove) : stacks
