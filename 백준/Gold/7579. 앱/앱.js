const fs = require('fs')
const [firstLine, secondLine, thirdLine] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.trim().split(' ').map(Number)
const memories = secondLine.trim().split(' ').map(Number)
const costs = thirdLine.trim().split(' ').map(Number)

const maxCost = costs.reduce((sum, cost) => sum + cost, 0);

const dp = Array(maxCost + 1).fill(0);

for (let i = 0; i < n; i++) {
    const memory = memories[i];
    const cost = costs[i];

    for (let c = maxCost; c >= cost; c--) {
        dp[c] = Math.max(dp[c], dp[c - cost] + memory);
    }
}

let answer = 0;
for (let cost = 0; cost <= maxCost; cost++) {
    if (dp[cost] >= m) {
        answer = cost;
        break;
    }
}

console.log(answer);