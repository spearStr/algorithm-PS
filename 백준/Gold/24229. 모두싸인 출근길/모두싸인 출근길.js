const fs = require('fs')
const [first, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(first)
let roads = input.map((line) => line.split(' ').map(Number))
roads.sort((a, b) => a[0] - b[0] || a[1] - b[1])

const newRoad = [roads[0]];

for (let i = 1; i < n; i++) {
    let [start, end] = newRoad[newRoad.length - 1];
    const [nextStart, nextEnd] = roads[i];

    if (end >= nextStart) {
        newRoad[newRoad.length - 1] = [start, Math.max(end, nextEnd)];
    } else {
        newRoad.push([nextStart, nextEnd]);
    }
}

const possibleQueue = [newRoad[0]]

let index = 1
let answer = 0
while (possibleQueue.length > 0) {
    const [start, end] = possibleQueue.shift();
    const energy = end - start;

    index = findRoad(index, end + energy);
    answer = Math.max(answer, end);
}

function findRoad(startIndex, target) {
    while (startIndex < newRoad.length) {
        if (newRoad[startIndex][0] <= target) {
            possibleQueue.push(newRoad[startIndex]);
        } else {
            return startIndex
        }
        startIndex += 1
    }
    return startIndex
}

console.log(answer)