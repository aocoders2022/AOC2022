import {
    assocPath,
    drop,
    dropLast,
    equals,
    filter,
    find,
    flatten,
    fromPairs,
    gt,
    lt,
    map,
    not,
    pipe,
    reduce,
    slice,
    sort,
    split,
    subtract,
    sum,
    take,
    takeLastWhile,
    takeWhile,
    trim,
    type,
    values,
} from "ramda"

const fileToEntry = (file) =>
    take(3, file) === "dir"
        ? [split(" ", file)[1], {}]
        : [split(" ", file)[1], split(" ", file)[0]]

const populateEntries = (files) => fromPairs(map(fileToEntry, files))

const populateTree = (tree, location, files) =>
    location.length
        ? assocPath(location, populateEntries(files), tree)
        : populateEntries(files)

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

const reduceSize = (total, value) =>
    total +
    (typeof value === "string"
        ? parseInt(value)
        : typeof value === "object"
        ? getSize(value)
        : 0)

export const getSize = (dir) => reduce(reduceSize, 0, values(dir))

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
