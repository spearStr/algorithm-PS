const fs = require('fs')
const [first, second, third] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(first)
const leftArr = second.split(' ').map(Number)
const rightArr = third.split(' ').map(Number)

const dp = Array(n + 1).fill(null).map(() => Array(n + 1).fill(0))

for (let left = n - 1; left >= 0; left--) {
    for (let right = n - 1; right >= 0; right--) {
        if (leftArr[left] > rightArr[right]) {
            dp[left][right] = rightArr[right] + dp[left][right + 1]
        } else {
            dp[left][right] = Math.max(dp[left + 1][right], dp[left + 1][right + 1])
        }
    }
}

console.log(dp[0][0])