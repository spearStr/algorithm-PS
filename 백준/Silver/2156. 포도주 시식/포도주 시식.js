const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)
const dp = Array(n).fill(0);
const amountArray = Array(n).fill(null);

for (let i = 0; i < n; i++) {
    const amount = Number(input[i])
    amountArray[i] = amount
}

dp[0] = amountArray[0];
if (n > 1) dp[1] = amountArray[0] + amountArray[1];
if (n > 2) dp[2] = Math.max(amountArray[0] + amountArray[2], amountArray[1] + amountArray[2], dp[1]);

for (let i = 3; i < n; i++) {
    // i-1번째 잔을 마신 경우
    const drinkLast = dp[i - 3] + amountArray[i - 1] + amountArray[i]

    // i-1번째 잔을 마시지 않은 경우
    const notDrinkLast = dp[i - 2] + amountArray[i]
    dp[i] = Math.max(drinkLast, notDrinkLast)

    // i번째 잔을 안 마시는 경우 고려
    dp[i] = Math.max(dp[i], dp[i - 1])
}

console.log(Math.max(...dp))