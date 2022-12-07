const findLs = (name, lines) => {
    const index = lines.findIndex((line) => line === `$ cd ${name}`)
    const withoutFirstLines = lines.slice(index + 2)
    const nextCommand = withoutFirstLines.findIndex((line) => line[0] === "$")
    const nextFiles = withoutFirstLines.slice(0, nextCommand)

    return nextFiles
}

const parseDirectory = (files, lines) => {
    return files.reduce((output, file) => {
        const splitFile = file.split(" ")
        const name = splitFile.slice(1).join("")

        if (file.slice(0, 3) === "dir") {
            if (JSON.stringify(findLs(name, lines)) === JSON.stringify(files)) {
                throw name
            }
        }

        output[name] =
            file.slice(0, 3) === "dir"
                ? parseDirectory(findLs(name, lines), lines)
                : splitFile.slice(0, 1).join("")

        return output
        // return {
        //     ...output,
        //     [file.split(" ").slice(1).join("")]:
        //         file.slice(0, 3) === "dir"
        //             ? parseDirectory(findLs(file.split(" ").slice(1).join(""), lines), lines)
        //             : file.split(" ").slice(0, 1).join(""),
        // }
    }, {})
}

export const buildTree = (lines) => {
    const withoutFirstLines = lines.slice(2)
    const firstCommand = withoutFirstLines.findIndex((line) => line[0] === "$")

    const firstDirectory = withoutFirstLines.slice(0, firstCommand)

    return parseDirectory(firstDirectory, lines)
}

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

export const atMost = (dir) => {
    return Object.entries(dir).reduce((total, [name, value]) => {
        if (typeof value === "string") {
            return total + parseInt(value)
        }

        if (typeof value === "object") {
            if (total + getSize(value) <= 100000) {
                console.warn(total + getSize(value))
            }

            return total + atMost(value)
        }

        return total
    }, 0)
}
