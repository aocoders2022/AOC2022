import { findMonkeyBusinessLevel, processPartialRound, processRound, processRounds } from "@/11/11"
import { readFileSync } from "fs"
import { resolve } from "path"

const parseBlock = (block) => {
    const [line1, line2, line3, line4, line5, line6] = block.split("\n").map((line) => line.trim())

    const monkey = parseInt(line1.replace("Monkey ", ""))

    const items = line2
        .replace("Starting items: ", "")
        .split(",")
        .map((item) => Number(item.trim()))

    const operation = (old) => eval(line3.replace("Operation: new = ", ""))

    const test = (item) => item % Number(line4.replace("Test: divisible by ", "")) === 0
    const divisible = Number(line4.replace("Test: divisible by ", ""))

    const truthy = Number(line5.replace("If true: throw to monkey ", ""))

    const falsey = Number(line6.replace("If false: throw to monkey ", ""))

    return { divisible, falsey, items, monkey, operation, test, truthy }
}

const parseInput = (input) => input.trim().split("\n\n").map(parseBlock)

const EXAMPLE = parseInput(String(readFileSync(resolve(__dirname, "11.example.txt"))))

const INPUT = parseInput(String(readFileSync(resolve(__dirname, "11.input.txt"))))

describe("findMonkeyBusinessLevel", () => {
    it.only("should return the monkey business level after the number of rounds", () => {
        // expect(findMonkeyBusinessLevel(20, EXAMPLE)).toEqual(10605)

        // expect(findMonkeyBusinessLevel(20, INPUT)).toEqual(120756)

        expect(findMonkeyBusinessLevel(20, EXAMPLE, (item) => item)).toEqual(10197)

        expect(findMonkeyBusinessLevel(10000, EXAMPLE, (item) => item)).toEqual(2713310158)

        expect(findMonkeyBusinessLevel(10000, INPUT, (item) => item)).toEqual(39109444654)
    })
})

describe("processPartialRound", () => {
    it("should return the expected items after a partial round", () => {
        expect(processPartialRound(0, EXAMPLE)).toEqual([
            {
                falsey: 3,
                items: [],
                monkey: 0,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 0,
                items: [54, 65, 75, 74],
                monkey: 1,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 3,
                items: [79, 60, 97],
                monkey: 2,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 1,
            },
            {
                falsey: 1,
                items: [74, 500, 620],
                monkey: 3,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 0,
            },
        ])

        expect(processPartialRound(1, processPartialRound(0, EXAMPLE))).toEqual([
            {
                falsey: 3,
                items: [20, 23, 27, 26],
                monkey: 0,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 0,
                items: [],
                monkey: 1,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 3,
                items: [79, 60, 97],
                monkey: 2,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 1,
            },
            {
                falsey: 1,
                items: [74, 500, 620],
                monkey: 3,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 0,
            },
        ])

        expect(
            processPartialRound(2, processPartialRound(1, processPartialRound(0, EXAMPLE)))
        ).toEqual([
            {
                falsey: 3,
                items: [20, 23, 27, 26],
                monkey: 0,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 0,
                items: [2080],
                monkey: 1,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 3,
                items: [],
                monkey: 2,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 1,
            },
            {
                falsey: 1,
                items: [74, 500, 620, 1200, 3136],
                monkey: 3,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 0,
            },
        ])

        expect(
            processPartialRound(
                3,
                processPartialRound(2, processPartialRound(1, processPartialRound(0, EXAMPLE)))
            )
        ).toEqual([
            {
                falsey: 3,
                items: [20, 23, 27, 26],
                monkey: 0,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 0,
                items: [2080, 25, 167, 207, 401, 1046],
                monkey: 1,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 2,
            },
            {
                falsey: 3,
                items: [],
                monkey: 2,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 1,
            },
            {
                falsey: 1,
                items: [],
                monkey: 3,
                operation: expect.any(Function),
                test: expect.any(Function),
                truthy: 0,
            },
        ])
    })
})

describe("processRound", () => {
    it("should return the monkeys after a round", () => {
        expect(processRound(EXAMPLE).map(({ items }) => items)).toEqual([
            [20, 23, 27, 26],
            [2080, 25, 167, 207, 401, 1046],
            [],
            [],
        ])

        expect(processRound(processRound(EXAMPLE)).map(({ items }) => items)).toEqual([
            [695, 10, 71, 135, 350],
            [43, 49, 58, 55, 362],
            [],
            [],
        ])

        expect(processRound(processRound(processRound(EXAMPLE))).map(({ items }) => items)).toEqual(
            [[16, 18, 21, 20, 122], [1468, 22, 150, 286, 739], [], []]
        )
    })
})

describe("processRounds", () => {
    it("should return the monkeys after a number of rounds", () => {
        expect(processRounds(3, EXAMPLE).map(({ items }) => items)).toEqual([
            [16, 18, 21, 20, 122],
            [1468, 22, 150, 286, 739],
            [],
            [],
        ])

        expect(processRounds(15, EXAMPLE).map(({ items }) => items)).toEqual([
            [83, 44, 8, 184, 9, 20, 26, 102],
            [110, 36],
            [],
            [],
        ])

        expect(processRounds(20, EXAMPLE).map(({ items }) => items)).toEqual([
            [10, 12, 14, 26, 34],
            [245, 93, 53, 199, 115],
            [],
            [],
        ])
    })
})
