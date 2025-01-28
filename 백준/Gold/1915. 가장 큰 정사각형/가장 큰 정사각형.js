const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.trim().split(' ').map(Number)
const board = input.map((line) => line.trim().split('').map(Number))

const dp = Array(n).fill(null).map(() => Array(m).fill(0))
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        dp[i][j] = board[i][j]
    }
}

for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
        if (board[i][j] === 1) dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
    }
}

let answer = 0
for (let i = 0; i < n; i++) {
    answer = Math.max(answer, Math.max(...dp[i]))
}

console.log(answer ** 2)