const fs = require('fs')
const [first, second, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(first)
const p = Number(second)
const planeInfo = input.map((line) => Number(line))

const parent = Array(n + 1).fill(0).map((_, i) => i);

function find(x) {
    if (parent[x] !== x) return parent[x] = find(parent[x])
    return parent[x]
}

function union(x, y) {
    parent[find(x)] = find(y);
}

let answer = 0;
for (let plane of planeInfo) {
    let dockingGate = find(plane);
    
    if (dockingGate === 0) break;

    answer += 1;
    union(dockingGate, dockingGate - 1);
}

console.log(answer);