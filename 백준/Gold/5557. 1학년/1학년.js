const fs = require('fs')
const [first, input] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const N = Number(first)
const numbers = input.trim().split(' ').map(Number)
const target = numbers[N - 1]

const dp = Array(21).fill(null).map(() => Array(N).fill(BigInt(0)))
dp[numbers[0]][1] = BigInt(1)

for (let i = 1; i < N - 1; i++) {
    for (let j = 0; j <= 20; j++) {
        if (dp[j][i] > 0) {
            if (j + numbers[i] <= 20) {
                dp[j + numbers[i]][i + 1] += dp[j][i]
            }

            if (j - numbers[i] >= 0) {
                dp[j - numbers[i]][i + 1] += dp[j][i]
            }
        }
    }
}

console.log(dp[target][N - 1].toString())