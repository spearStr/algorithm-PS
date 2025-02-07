const fs = require('fs')
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const order = input.map((line) => Number(line))
const dp = Array(31).fill(null).map(() => Array(31).fill(0))

for (let i = 0; i < 31; i++) {
    dp[i][0] = 1
}

for (let i = 1; i < 31; i++) {
    for (let j = 0; i + j < 31; j++) {
        if (j === 0) {
            dp[j][i] = dp[j + 1][i - 1]
        } else {
            dp[j][i] = dp[j + 1][i - 1] + dp[j - 1][i]
        }
    }
}

const answer = []
for (let i = 0; i < order.length - 1; i++) {
    answer.push(dp[0][order[i]])
}

console.log(answer.join('\n'))