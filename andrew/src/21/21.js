const { readFileSync } = require("fs")
const { resolve } = require("path")

const getRootValue = (object) => {
    while (Object.values(object).some((job) => typeof job === "string")) {
        Object.entries(object).forEach(([monkey, job]) => {
            const result = eval(job)

            if (typeof result === "number" && !isNaN(result)) {
                object[monkey] = result
            }
        })
    }

    return object.root
}

const parseInput = (input) =>
    Object.fromEntries(
        input
            .split("\n")
            .map((line) => line.split(": "))
            .map(([monkey, job]) => [monkey, !isNaN(Number(job)) ? Number(job) : job])
            .map(([monkey, job]) => {
                if (typeof job === "number") {
                    return [monkey, job]
                }

                if (job.includes(" + ")) {
                    return [
                        monkey,
                        job
                            .split(" + ")
                            .map((part) => `object.${part}`)
                            .join(" + "),
                    ]
                }

                if (job.includes(" * ")) {
                    return [
                        monkey,
                        job
                            .split(" * ")
                            .map((part) => `object.${part}`)
                            .join(" * "),
                    ]
                }

                if (job.includes(" - ")) {
                    return [
                        monkey,
                        job
                            .split(" - ")
                            .map((part) => `object.${part}`)
                            .join(" - "),
                    ]
                }

                if (job.includes(" / ")) {
                    return [
                        monkey,
                        job
                            .split(" / ")
                            .map((part) => `object.${part}`)
                            .join(" / "),
                    ]
                }
            })
    )

const EXAMPLE = parseInput(String(readFileSync(resolve(__dirname, "21.example.txt"))))
const INPUT = parseInput(String(readFileSync(resolve(__dirname, "21.input.txt"))))

console.warn(getRootValue(EXAMPLE), getRootValue(EXAMPLE) === 152)
console.warn(getRootValue(INPUT), getRootValue(INPUT) === 21120928600114)
