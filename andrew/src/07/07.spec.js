import { buildTree, getSize, findAtMost } from "@/07/07"
import { readFileSync } from "fs"
import { resolve } from "path"
import { split } from "ramda"

const INPUT = split(
    "\n",
    String(readFileSync(resolve(__dirname, "07.input.txt")))
)

describe("getSize", () => {
    it("should return the siez sizes", () => {
        expect(
            getSize({
                i: "584",
            })
        ).toEqual(584)

        expect(
            getSize({
                e: {
                    i: "584",
                },
                f: "29116",
                g: "2557",
                "h.lst": "62596",
            })
        ).toEqual(94853)

        expect(
            getSize({
                j: "4060174",
                "d.log": "8033020",
                "d.ext": "5626152",
                k: "7214296", // remember new line for this??
            })
        ).toEqual(24933642)

        expect(
            getSize({
                a: {
                    e: {
                        i: "584",
                    },
                    f: "29116",
                    g: "2557",
                    "h.lst": "62596",
                },
                "b.txt": "14848514",
                "c.dat": "8504156",
                d: {
                    j: "4060174",
                    "d.log": "8033020",
                    "d.ext": "5626152",
                    k: "7214296", // remember new line for this??
                },
            })
        ).toEqual(48381165)
    })
})

describe("buildTree", () => {
    it("should build a tree from the given lines", () => {
        expect(
            buildTree([
                "$ cd /",
                "$ ls",
                "dir a",
                "14848514 b.txt",
                "8504156 c.dat",
                "dir d",
                "$ cd a",
                "$ ls",
                "dir e",
                "29116 f",
                "2557 g",
                "62596 h.lst",
                "$ cd e",
                "$ ls",
                "584 i",
                "$ cd ..",
                "$ cd ..",
                "$ cd d",
                "$ ls",
                "4060174 j",
                "8033020 d.log",
                "5626152 d.ext",
                "7214296 k",
                "",
            ])
        ).toEqual({
            a: {
                e: {
                    i: "584",
                },
                f: "29116",
                g: "2557",
                "h.lst": "62596",
            },
            "b.txt": "14848514",
            "c.dat": "8504156",
            d: {
                j: "4060174",
                "d.log": "8033020",
                "d.ext": "5626152",
                k: "7214296", // remember new line for this??
            },
        })
    })
})

describe("findAtMost", () => {
    it("should return the at most", () => {
        expect(
            findAtMost({
                a: {
                    e: {
                        i: "584",
                    },
                    f: "29116",
                    g: "2557",
                    "h.lst": "62596",
                },
                "b.txt": "14848514",
                "c.dat": "8504156",
                d: {
                    j: "4060174",
                    "d.log": "8033020",
                    "d.ext": "5626152",
                    k: "7214296", // remember new line for this??
                },
            })
        ).toEqual(95437)

        expect(findAtMost(buildTree(INPUT))).toEqual(95437)
    })
})
