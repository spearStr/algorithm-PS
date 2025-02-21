const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m, size, k] = firstLine.split(' ').map(Number)
const coordinates = input.map((line) => line.split(' ').map(Number))

let answer = 0;

for (const [x1, _] of coordinates) {
    for (const [_, y2] of coordinates) {
        let count = 0;
        for (const [starX, starY] of coordinates) {
            if (x1 <= starX && starX <= x1 + size && y2 <= starY && starY <= y2 + size) {
                count += 1;
            }
        }
        answer = Math.max(answer, count);
    }
}

console.log(k - answer);