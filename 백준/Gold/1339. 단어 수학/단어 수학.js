const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const n = Number(firstLine)
const words = input.map((line) => line.trim().split(''))

const numberMap = new Map()
for (const letters of words) {
    const len = letters.length
    for (let i = 0; i < len; i++) {
        if (numberMap.has(letters[i])) {
            const value = numberMap.get(letters[i])
            numberMap.set(letters[i], value + 10 ** (len - i - 1))
        } else {
            numberMap.set(letters[i], 10 ** (len - i - 1))
        }
    }
}

const list = [...numberMap.values()].sort((a, b) => b - a)
let index = 9
let answer = 0
for (const value of list) {
    answer += value * index
    index -= 1
}

console.log(answer)