const fs = require('fs')
const [firstLine, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, minLevel, maxLevel, gap] = firstLine.split(' ').map(Number)
const levels = input.split(' ').map(Number)

levels.sort((a, b) => a - b)

function solution() {
    let answer = 0

    for (let mask = 1; mask < (1 << n); mask++) {
        let test = [];

        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                test.push(levels[i]);
            }
        }

        const min = Math.min(...test);
        const max = Math.max(...test);
        const total = test.reduce((acc, cur) => acc + cur, 0);
        
        if (test.length >= 2 && total >= minLevel && total <= maxLevel && (max - min) >= gap) {
            answer += 1
        }
    }

    console.log(answer);
}
if (n === 1) {
    console.log(0)
} else {
    solution()
}