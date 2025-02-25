const fs = require('fs')
const [first, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const t = Number(first)
const numbers = input.map((line) => Number(line))

const answer = []
const dp = Array(Math.max(...numbers) + 1).fill(null).map(() => Array(4).fill(0))

dp[1][1] = 1;
dp[2][1] = 1;
dp[2][2] = 1;
dp[3][1] = 1;
dp[3][2] = 1;
dp[3][3] = 1;

for (let i = 4; i <= Math.max(...numbers); i++) {
    dp[i][1] = dp[i - 1][1];
    dp[i][2] = dp[i - 2][1] + dp[i - 2][2];
    dp[i][3] = dp[i - 3][1] + dp[i - 3][2] + dp[i - 3][3];
}

for (const number of numbers) {
    answer.push(dp[number][1] + dp[number][2] + dp[number][3])
}

console.log(answer.join('\n'))