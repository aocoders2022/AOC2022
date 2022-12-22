const { readFileSync } = require("fs")
const { resolve } = require("path")

const getInput = (file = "input") => {
    const contents = String(readFileSync(resolve(__dirname, `22.${file}.txt`)))
    const lines = contents.split("\n")

    /* ------------------------------------------------------------------------------------------ */

    const reduceGrid = (reducer) =>
        lines
            .slice(0, -2)
            .map((line) => line.split(""))
            .reduce(
                (reducedGrid, row, r) =>
                    row.reduce(
                        (reducedGrid, cell, c) => reducer(reducedGrid, cell, [r, c]),
                        new Set(reducedGrid)
                    ),
                new Set()
            )

    const board = reduceGrid((board, cell, [r, c]) =>
        cell !== " " ? new Set(board).add(`${r},${c}`) : board
    )

    const walls = reduceGrid((walls, cell, [r, c]) =>
        cell === "#" ? new Set(walls).add(`${r},${c}`) : walls
    )

    /* ------------------------------------------------------------------------------------------ */

    const [r, c] = Array.from(board)
        .map((coordinates) => coordinates.split(",").map(Number))
        .find(([r, c]) => !r && !walls.has(`${r},${c}`))

    const position = { c, facing: "E", r }

    /* ------------------------------------------------------------------------------------------ */

    const isLR = (value) => "LR".includes(value)

    const path = lines
        .slice(-1)[0]
        .split("")
        .reduce((path, character) => {
            const last = path[path.length - 1]

            return isLR(character) || isLR(last)
                ? [...path, character]
                : [...path.slice(0, -1), `${last}${character}`]
        })
        .map((value) => (isLR(value) ? value : Number(value)))

    /* ------------------------------------------------------------------------------------------ */

    return { board, path, position, walls }
}

const movePosition = ({ c, facing, r }, action, { board, walls }) => {
    const NESW = ["N", "E", "S", "W"]

    if (action === "R") {
        return { c, facing: NESW[NESW.indexOf(facing) + 1] || NESW[0], r }
    }

    if (action === "L") {
        return { c, facing: NESW[NESW.indexOf(facing) - 1] || NESW[NESW.length - 1], r }
    }

    /* ------------------------------------------------------------------------------------------ */

    const isOffBoard = ([r, c]) => !board.has(`${r},${c}`)

    const isWall = ([r, c]) => walls.has(`${r},${c}`)

    const firstC = (c) => (!isOffBoard([r, c - 1]) ? firstC(c - 1) : c)

    const lastC = (c) => (!isOffBoard([r, c + 1]) ? lastC(c + 1) : c)

    const firstR = (r) => (!isOffBoard([r - 1, c]) ? firstR(r - 1) : r)

    const lastR = (r) => (!isOffBoard([r + 1, c]) ? lastR(r + 1) : r)

    if (facing === "E") {
        const moveRight = (times, c) => {
            const nextC = lastC(c) === c ? firstC(c) : c + 1

            return isWall([r, nextC]) ? c : times === 1 ? nextC : moveRight(times - 1, nextC)
        }

        return {
            c: moveRight(action, c),
            facing,
            r,
        }
    }

    if (facing === "S") {
        const moveDown = (times, r) => {
            const nextR = lastR(r) === r ? firstR(r) : r + 1

            return isWall([nextR, c]) ? r : times === 1 ? nextR : moveDown(times - 1, nextR)
        }

        return {
            c,
            facing,
            r: moveDown(action, r),
        }
    }

    if (facing === "W") {
        const moveLeft = (times, c) => {
            const nextC = firstC(c) === c ? lastC(c) : c - 1

            return isWall([r, nextC]) ? c : times === 1 ? nextC : moveLeft(times - 1, nextC)
        }

        return {
            c: moveLeft(action, c),
            facing,
            r,
        }
    }

    if (facing === "N") {
        const moveUp = (times, r) => {
            const nextR = firstR(r) === r ? lastR(r) : r - 1

            return isWall([nextR, c]) ? r : times === 1 ? nextR : moveUp(times - 1, nextR)
        }

        return {
            c,
            facing,
            r: moveUp(action, r),
        }
    }
}

const traversePath = (position, path, board, walls) =>
    path.reduce((position, action) => movePosition(position, action, { board, walls }), position)

const getPassword = ({ c, facing, r }) => 1000 * (r + 1) + 4 * (c + 1) + "ESWN".indexOf(facing)

/* ---------------------------------------------------------------------------------------------- */

const EXAMPLE = getInput("example")

const INPUT = getInput()

console.warn(
    getPassword(traversePath(EXAMPLE.position, EXAMPLE.path, EXAMPLE.board, EXAMPLE.walls), 6032)
)

console.warn(getPassword(traversePath(INPUT.position, INPUT.path, INPUT.board, INPUT.walls)), 88268)
