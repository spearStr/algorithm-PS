const fs = require('fs')
const [first, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(first)

const priceInfo = input.map((line) => line.split(' ').map(Number))
const dp = Array(2).fill(null).map(() => Array(n + 1).fill(Infinity))
dp[0][0] = 0
dp[1][0] = 0

for (let i = 1; i <= n; i++) {
    const [condition, reward] = priceInfo[i - 1]
    if (dp[0][i - 1] <= condition) {
        dp[0][i] = Math.min(dp[0][i - 1] + reward, dp[0][i])
    }

    dp[1][i] = Math.min(dp[1][i], dp[0][i - 1])

    if (dp[1][i - 1] <= condition) {
        dp[1][i] = Math.min(dp[1][i - 1] + reward, dp[1][i])
    }
}

if (dp[0][n - 1] !== Infinity || dp[1][n] !== Infinity) {
    console.log('Kkeo-eok')
} else {
    console.log('Zzz')
}