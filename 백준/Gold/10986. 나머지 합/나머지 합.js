const fs = require('fs')
const [firstLine, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const numbers = input.split(' ').map(Number)

const prefixSum = Array(n).fill(0)
const remainArr = Array(m).fill(0)

prefixSum[0] = numbers[0]
remainArr[prefixSum[0] % m] += 1
for (let i = 1; i < n; i++) {
    prefixSum[i] += prefixSum[i - 1] + numbers[i]
    remainArr[prefixSum[i] % m] += 1
}

let answer = remainArr[0]
for (const remain of remainArr) {
    answer += remain * (remain - 1) / 2
}

console.log(answer)