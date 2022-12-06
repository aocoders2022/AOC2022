import { findStartOfMarkerIndex } from "@/06/06"
import { readFileSync } from "fs"
import { resolve } from "path"

const INPUT = String(readFileSync(resolve(__dirname, "06.input.txt")))

describe("findStartOfMarkerIndex", () => {
    it("should return the start-of marker index", () => {
        expect(findStartOfMarkerIndex("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(7)

        expect(findStartOfMarkerIndex("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(5)

        expect(findStartOfMarkerIndex("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(6)

        expect(findStartOfMarkerIndex("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(10)

        expect(findStartOfMarkerIndex("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(11)

        expect(findStartOfMarkerIndex(INPUT)).toEqual(1080)

        expect(findStartOfMarkerIndex("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14)).toEqual(19)

        expect(findStartOfMarkerIndex("bvwbjplbgvbhsrlpgdmjqwftvncz", 14)).toEqual(23)

        expect(findStartOfMarkerIndex("nppdvjthqldpwncqszvftbrmjlhg", 14)).toEqual(23)

        expect(findStartOfMarkerIndex("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14)).toEqual(29)

        expect(findStartOfMarkerIndex("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14)).toEqual(26)

        expect(findStartOfMarkerIndex(INPUT, 14)).toEqual(3645)
    })
})
