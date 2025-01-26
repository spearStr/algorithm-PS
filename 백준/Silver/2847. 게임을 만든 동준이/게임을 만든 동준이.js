const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const N = Number(firstLine)
const level = []
for (let line of input) {
    line = Number(line)
    level.push(line)
}

let answer = 0

for (let i = N - 1; i >= 0; i--) {
    if (level[i] <= level[i - 1]) {
        answer += level[i - 1] - level[i] + 1
        level[i - 1] = level[i] - 1
    }
}

console.log(answer)