const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const edges = input.map((line) => line.split(' ').map(Number))
edges.sort((a, b) => a[2] - b[2])

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
for (const edge of edges) {
    const [start, end, weight] = edge

    graph[start].push([end, weight])
    graph[end].push([start, weight])
}

const parent = Array(n + 1).fill(0)
for (let i = 1; i <= n; i++) {
    parent[i] = i
}

let answer = 0
let maxAnswer = 0

function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
}

function union(node1, node2, weight) {
    const root1 = find(node1)
    const root2 = find(node2)

    if (root1 !== root2) {
        if (root1 < root2) {
            parent[root2] = root1
        } else {
            parent[root1] = root2
        }
        answer += weight
        maxAnswer = Math.max(maxAnswer, weight)
    }
}

for (const edge of edges) {
    const [start, end, weight] = edge

    union(start, end, weight)
}

console.log(answer - maxAnswer)