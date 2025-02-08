const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [vertex, edge] = firstLine.split(' ').map(Number)

const graph = [];
for (const edge of input) {
    const [start, end, weight] = edge.split(' ').map(Number);
    graph.push([weight, start, end]);
}

function find(parent, i) {
    if (parent[i] !== i) parent[i] = find(parent, parent[i]);
    return parent[i];
}

function union(parent, x, y) {
    const rootX = find(parent, x);
    const rootY = find(parent, y);

    if (rootX !== rootY) parent[rootY] = rootX;
}

graph.sort((a, b) => a[0] - b[0]);

let parent = [];

for (let v = 0; v < vertex; v++) {
    parent[v] = v;
}

let answer = 0;
for (const [weight, u, v] of graph) {
    const rootU = find(parent, u - 1);
    const rootV = find(parent, v - 1);

    if (rootU !== rootV) {
        union(parent, rootU, rootV);
        answer += weight;
    }
}

console.log(answer);