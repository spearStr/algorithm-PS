const fs = require('fs')
const [first, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = first.split(' ').map(Number)
const numbers = input.split(' ').map(Number)
numbers.sort((a, b) => a - b)

const answer = []

function backtracking(sequence, start) {
    if (sequence.length === m) {
        answer.push(sequence.join(' '))
        return
    }

    for (let i = start; i < n; i++) {
        sequence.push(numbers[i])
        backtracking(sequence, i + 1)
        sequence.pop()
    }
}

backtracking([], 0)

console.log(answer.join('\n'))