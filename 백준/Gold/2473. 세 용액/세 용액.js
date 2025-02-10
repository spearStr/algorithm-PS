const fs = require('fs')
const [firstLine, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)
const arr = input.split(' ').map(Number)

arr.sort((a, b) => a - b)

let answer = {
    sum: Infinity,
    numbers: []
}

for (let i = 0; i < n; i++) {
    solution(i)
}

function solution(index) {
    let left = index + 1
    let right = n - 1

    while (left < right) {
        const sum = arr[index] + arr[left] + arr[right];

        if (Math.abs(sum) < Math.abs(answer.sum)) {
            answer.sum = sum;
            answer.numbers = [arr[index], arr[left], arr[right]];
        }

        if (sum < 0) left += 1
        else if (sum > 0) right -= 1
        else return
    }
}

console.log(answer.numbers.join(' '))