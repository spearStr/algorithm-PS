const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, height] = firstLine.split(' ').map(Number)
const walls = input.map(Number)

const stalagmite = Array(height).fill(0)
const stalactite = Array(height).fill(0)

for (let i = 0; i < n; i++) {
    const wall = walls[i]

    if (i % 2 === 0) {
        stalagmite[wall - 1] += 1
    } else {
        stalactite[height - wall] += 1
    }
}

for (let i = height - 2; i >= 0; i--) {
    stalagmite[i] += stalagmite[i + 1]
}

for (let i = 1; i < height; i++) {
    stalactite[i] += stalactite[i - 1]
}

let minBreak = Infinity
let count = 0

for (let i = 0; i < height; i++) {
    const broken = stalagmite[i] + stalactite[i]

    if (broken < minBreak) {
        minBreak = broken
        count = 1
    } else if (broken === minBreak) {
        count += 1
    }
}

console.log(minBreak, count)
