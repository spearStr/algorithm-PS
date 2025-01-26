const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim();

const n = Number(input);

function solution() {
    if (n === 0) {
        console.log(0);
        console.log(0);
        return
    }

    const dp = Array(Math.abs(n) + 1).fill(0)
    dp[0] = 0
    dp[1] = 1

    for (let i = 2; i <= Math.abs(n); i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000000
    }

    if (n < 0 && Math.abs(n) % 2 === 0) {
        console.log(-1)
        console.log(dp[-n])
    } else if (n < 0 && Math.abs(n) % 2 === 1) {
        console.log(1)
        console.log(dp[-n])
    } else {
        console.log(1)
        console.log(dp[n])
    }
}

solution();
