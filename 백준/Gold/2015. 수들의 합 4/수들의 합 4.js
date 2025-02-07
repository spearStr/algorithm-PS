const fs = require('fs')
const [firstLine, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, target] = firstLine.split(' ').map(Number)
const arr = input.split(' ').map(Number)
let prefixSum = 0;
let countMap = new Map();
countMap.set(0, 1);
let answer = 0;

for (let i = 0; i < n; i++) {
    prefixSum += arr[i];

    if (countMap.has(prefixSum - target)) {
        answer += countMap.get(prefixSum - target);
    }

    countMap.set(prefixSum, (countMap.get(prefixSum) || 0) + 1);
}

console.log(answer);