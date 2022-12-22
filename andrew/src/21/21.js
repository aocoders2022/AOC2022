const { readFileSync } = require("fs")
const { resolve } = require("path")

const getRootValue = (obj) => {
    const object = { ...obj }

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

const getRootValue2 = (obj) => {
    const initialObject = { ...obj }

    Object.entries(initialObject).forEach(([monkey, job]) => {
        if (monkey === "root") {
            initialObject.root = job.replace(" + ", " === ")
        }
    })

    let object = { ...initialObject }
    let counter = 0

    while (Object.values(object).some((job) => typeof job === "string") && object.root !== true) {
        object.humn = counter

        Object.entries(object).forEach(([monkey, job]) => {
            const result = eval(job)

            if (typeof result === "number" && !isNaN(result) && monkey !== "humn") {
                object[monkey] = result
            }

            if (
                monkey === "root" &&
                typeof result === "boolean" &&
                Object.entries(object)
                    .filter(([monkey]) => monkey !== "root")
                    .every(([, job]) => typeof job === "number")
            ) {
                object[monkey] = result
            }
        })

        if (typeof object.root === "boolean" && object.root === false) {
            counter = counter + 1
            object = { ...initialObject }
        }
    }

    return object.humn
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

console.warn(getRootValue2(EXAMPLE), getRootValue2(EXAMPLE) === 301)
// console.warn(getRootValue2(INPUT))
