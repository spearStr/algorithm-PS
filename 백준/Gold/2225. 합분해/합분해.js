const fs = require('fs');
const [n, k] = fs.readFileSync('dev/stdin').toString().trim().split(' ').map(Number);

const MOD = 1000000000;
const dp = Array(k + 1).fill(null).map(() => Array(n + 1).fill(0));

for (let i = 1; i <= k; i++) {
    dp[i][0] = 1;
}

for (let i = 1; i <= k; i++) {
    for (let j = 1; j <= n; j++) {
        dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % MOD;
    }
}

console.log(dp[k][n] % MOD);