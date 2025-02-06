const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)
const coordinates = input.map((line) => line.split(' ').map(Number))

coordinates.sort((a, b) => a[0] - b[0] || a[1] - b[1])

const coordinatesInfo = new Map();
for (const [x, y] of coordinates) {
    if (!coordinatesInfo.has(x)) {
        coordinatesInfo.set(x, new Set())
    }
    coordinatesInfo.get(x).add(y)
}

let answer = 0;

const filteredKeys = [...coordinatesInfo.keys()].filter(key => coordinatesInfo.get(key).size >= 2)

for (let i = 0; i < filteredKeys.length; i++) {
    for (let j = i + 1; j < filteredKeys.length; j++) {
        const x1 = filteredKeys[i]
        const x2 = filteredKeys[j]
        const y1Set = coordinatesInfo.get(x1)
        const y2Set = coordinatesInfo.get(x2)

        let count = 0
        for (const y of y1Set) {
            if (y2Set.has(y)) count += 1
        }

        if (count >= 2) {
            answer += (count * (count - 1)) / 2
        }
    }
}

console.log(answer)
