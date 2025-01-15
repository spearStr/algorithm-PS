const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const N = Number(firstLine)

const dp = Array(N + 1).fill(0)
for (let i = 1; i <= N; i++) {
    const [work, _, ...prevWorks] = input[i - 1].split(" ").map(Number)
    dp[i] = work;

    for (const prev of prevWorks) {
        dp[i] = Math.max(dp[i], dp[prev] + work)
    }
}

console.log(Math.max(...dp))