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

const getRootValue3 = (obj) => {
    Object.entries(obj).forEach(([monkey, job]) => {
        if (monkey === "root") {
            obj.root = job.replace(" + ", " === ")
        }
    })

    let canStillReduce = true
    let equation = obj.root

    while (canStillReduce) {
        Object.entries(obj).forEach(([monkey, job]) => {
            if (monkey !== "humn") {
                equation = equation.replace(monkey, `(${job})`)
            }
        })

        try {
            let equation2 = equation.replace("humn", 0)
            typeof eval(equation2) === "boolean"
            canStillReduce = false
        } catch (e) {}
    }

    let canStillLoop = true
    let counter = 1

    const [left, right] = equation.split(" === ")

    // console.warn(eval(right))
    // console.warn(left)

    while (canStillLoop) {
        let humn = counter

        if (eval(equation) === true) {
            break
        }

        counter = counter + 1
    }

    return counter
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

const parseInput2 = (input) =>
    Object.fromEntries(
        input
            .split("\n")
            .map((line) => line.split(": "))
            .map(([monkey, job]) => [monkey, !isNaN(Number(job)) ? Number(job) : job])
    )

const EXAMPLE = parseInput(String(readFileSync(resolve(__dirname, "21.example.txt"))))
const EXAMPLE2 = parseInput2(String(readFileSync(resolve(__dirname, "21.example.txt"))))
const INPUT = parseInput(String(readFileSync(resolve(__dirname, "21.input.txt"))))
const INPUT2 = parseInput2(String(readFileSync(resolve(__dirname, "21.input.txt"))))

console.warn(getRootValue(EXAMPLE), getRootValue(EXAMPLE) === 152)
console.warn(getRootValue(INPUT), getRootValue(INPUT) === 21120928600114)

console.warn(getRootValue2(EXAMPLE), getRootValue2(EXAMPLE) === 301)
// console.warn(getRootValue3(EXAMPLE2), getRootValue3(EXAMPLE2) === 301)
console.warn(getRootValue3(INPUT2))
