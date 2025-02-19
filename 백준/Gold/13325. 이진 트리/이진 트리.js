const fs = require('fs')
const [firstLine, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const depth = Number(firstLine)
const n = 2 ** (depth + 1)

const weights = [0, 0, ...input.split(' ').map(Number)]
const sums = Array(n).fill(0)

let key = n / 2
while (key > 1) {
    for (let i = key; i <= 2 * key - 1; i++) {
        if (i % 2 !== 0) continue
        const temp1 = weights[i] + sums[i]
        const temp2 = weights[i + 1] + sums[i + 1]
        const gap = Math.abs(temp1 - temp2)

        const maxValue = Math.max(temp1, temp2)
        sums[i / 2] = maxValue

        if (temp1 > temp2) {
            weights[i + 1] += gap
        } else if (temp1 < temp2) {
            weights[i] += gap
        }
    }
    key /= 2
}

const answer = weights.slice(2).reduce((acc, cur) => acc + cur, 0)
console.log(answer)