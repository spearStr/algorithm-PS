const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const [n, moveCount] = firstLine.trim().split(' ').map(Number);

const info = [];
for (let line of input) {
    line = Number(line);
    info.push(line);
}

const dp = Array(n).fill(null).map(() => Array(moveCount + 1).fill(0))

if (info[0] === 1) dp[0][0] = 1;
if (info[0] === 2) dp[0][1] = 1;

for (let i = 1; i < n; i++) {
    for (let j = 0; j <= moveCount; j++) {
        dp[i][j] = dp[i - 1][j];

        if (j > 0) {
            dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1]);
        }

        if (info[i] === 1 && j % 2 === 0) {
            dp[i][j] += 1
        } else if (info[i] === 2 && j % 2 === 1) {
            dp[i][j] += 1
        }
    }
}

const result = Math.max(...dp[n - 1]);
console.log(result);