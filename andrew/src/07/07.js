const isCommand = (line) => line[0] === "$"
const isCd = (line) => isCommand(line) && line.slice(2, 4) == "cd"
const getCd = (line) => line.slice(4).trim()
const isCdUp = (line) => getCd(line) === ".."
const isLs = (line) => isCommand(line) && line.slice(2, 4) == "ls"
const getLs = (index, lines) => {
    const withoutFirstLines = lines.slice(index + 1)
    const nextCommand = withoutFirstLines.findIndex(isCommand)
    const nextFiles = withoutFirstLines.slice(0, nextCommand)

    return nextFiles
}

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

const processLine = ([location, tree], line, i, lines) => {
    if (!isCommand(line)) {
        return [location, tree]
    }

    if (isCd(line)) {
        if (isCdUp(line)) {
            return [location.slice(0, -1), tree]
        }

        return [[...location, getCd(line)], tree]
    }

    if (isLs(line)) {
        return [location, populateTree(tree, location, getLs(i, lines))]
    }

    return [location, tree]
}

export const buildTree = (lines) =>
    lines.slice(1).reduce(processLine, [[], {}])[1]

export const getSize = (dir) => {
    return Object.entries(dir).reduce((total, [name, value]) => {
        if (typeof value === "string") {
            return total + parseInt(value)
        }

        if (typeof value === "object") {
            return total + getSize(value)
        }

        return total
    }, 0)
}

const calculateAllDirSizes = (tree) => {
    const dirs = Object.entries(tree)
        .filter(([, value]) => typeof value === "object")
        .map(([, value]) => value)

    if (!dirs.length) {
        return []
    }

    return [...dirs.map(getSize), ...dirs.map(calculateAllDirSizes)].flat()
}

export const findAtMost = (tree) => {
    const sizes = calculateAllDirSizes(tree)

    return sizes.filter((size) => size < 100000).reduce((a, b) => a + b)
}
