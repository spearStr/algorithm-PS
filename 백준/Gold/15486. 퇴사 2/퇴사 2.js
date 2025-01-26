const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const N = Number(firstLine)
const counselArray = []
for (line of input) {
    const [day, pay] = line.trim().split(' ').map(Number)
    counselArray.push([day, pay])
}

const dp = Array(N + 1).fill(0);

for (let i = 0; i < N; i++) {
    const [day, pay] = counselArray[i];

    dp[i + 1] = Math.max(dp[i + 1], dp[i]);

    if (i + day <= N) {
        dp[i + day] = Math.max(dp[i + day], dp[i] + pay);
    }
}

console.log(dp[N]);