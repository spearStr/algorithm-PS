const fs = require('fs')
const [first, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(first)
const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
const visit = Array(n + 1).fill(false)

let line = 0
for (let i = 0; i < n - 1; i++) {
    const [start, end] = input[line++].split(' ').map(Number)

    graph[start].push(end)
    graph[end].push(start)
}

const path = input[line].split(' ').map(Number)

if (path[0] !== 1) { 
    console.log(0);
    process.exit(0);
}

const indexMap = Array(n + 1).fill(0);
for (let i = 0; i < n; i++) {
    indexMap[path[i]] = i;
}

for (let i = 1; i <= n; i++) {
    graph[i].sort((a, b) => indexMap[a] - indexMap[b]);
}

let order = [];
function dfs(node) {
    visit[node] = true;
    order.push(node);

    for (const next of graph[node]) {
        if (!visit[next]) dfs(next);
    }
}

dfs(1);

console.log(order.join(' ') === path.join(' ') ? 1 : 0);