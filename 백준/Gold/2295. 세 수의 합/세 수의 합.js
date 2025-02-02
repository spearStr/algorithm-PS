const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)
const numbers = input.map((line) => Number(line))

numbers.sort((a, b) => a - b)

const candidates = new Set()
for (const first of numbers) {
    for (const second of numbers) {
        candidates.add(first + second)
    }
}


function solution() {
    let answer = 0;
    for (let i = n - 1; i > 0; i--) {
        for (let j = 0; j < n; j++) {
            const candidate = numbers[i] - numbers[j]
            if (candidates.has(candidate)) {
                answer = numbers[i]
                console.log(answer)
                return;
            }
        }
    }
}

solution()