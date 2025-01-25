const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const N = Number(firstLine)
const weight = []
for (line of input) {
    const wei = Number(line)
    weight.push(wei)
}

weight.sort((a, b) => b - a)

let answer = 0;
for (let i = 0; i < N; i++) {
    answer = Math.max(answer, weight[i] * (i + 1))
}

console.log(answer)