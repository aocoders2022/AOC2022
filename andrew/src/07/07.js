import {
    drop,
    dropLast,
    equals,
    filter,
    find,
    flatten,
    gt,
    lt,
    map,
    not,
    pipe,
    reduce,
    slice,
    sort,
    subtract,
    sum,
    takeWhile,
    trim,
    type,
    values,
} from "ramda"

// Mutatable... for now
// Maybe we can do with assocPath??
const populateTree = (tree, location, files) => {
    const clonedTree = JSON.parse(JSON.stringify(tree))

    const child = location.reduce(
        (newTree, nextChunk) => newTree[nextChunk],
        clonedTree
    )

    files.forEach((file) => {
        if (file.slice(0, 3) === "dir") {
            child[file.split(" ")[1]] = {}
        } else {
            child[file.split(" ")[1]] = file.split(" ")[0]
        }
    })

    return clonedTree
}

/* -------------------------------------------------------------------------- */

const isCommand = (line) => line[0] === "$"
const getCommand = (line) => slice(2, 4, line)

const isCd = (line) => isCommand(line) && getCommand(line) == "cd"
const isCdUp = (line) => isCd(line) && getCd(line) === ".."
const getCd = (line) => trim(drop(4, line))

const isLs = (line) => isCommand(line) && getCommand(line) == "ls"
const getLs = (index, lines) =>
    takeWhile(pipe(isCommand, not), drop(index + 1, lines))

const processLine = ([location, tree], line, i, lines) =>
    !isCommand(line)
        ? [location, tree]
        : isCdUp(line)
        ? [dropLast(1, location), tree]
        : isCd(line)
        ? [[...location, getCd(line)], tree]
        : isLs(line)
        ? [location, populateTree(tree, location, getLs(i, lines))]
        : [location, tree]

export const buildTree = (lines) =>
    drop(1, lines).reduce(processLine, [[], {}])[1]

export const getSize = (dir) =>
    reduce(
        (total, value) =>
            total +
            (typeof value === "string"
                ? parseInt(value)
                : typeof value === "object"
                ? getSize(value)
                : 0),
        0,
        values(dir)
    )

export const calculateAllDirSizes = (tree) =>
    sort(
        subtract,
        flatten([
            ...map(getSize, filter(pipe(type, equals("Object")), values(tree))),
            ...map(
                calculateAllDirSizes,
                filter(pipe(type, equals("Object")), values(tree))
            ),
        ])
    )

export const findAtMost = (tree) =>
    sum(filter(gt(100000), calculateAllDirSizes(tree)))

export const findSmallest = (tree, minSize) =>
    find(lt(minSize), sort(subtract, calculateAllDirSizes(tree)))

export const calculateSpaceToFree = (directory) =>
    30000000 - (70000000 - getSize(directory))
