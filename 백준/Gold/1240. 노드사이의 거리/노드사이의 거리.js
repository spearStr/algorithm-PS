const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))

let line = 0;
for (let i = 0; i < n - 1; i++) {
    const [start, end, cost] = input[line++].split(' ').map(Number)
    graph[start].push([end, cost])
    graph[end].push([start, cost])
}

for (let i = 0; i < m; i++) {
    const [start, end] = input[line++].split(' ').map(Number)
    const visit = Array(n + 1).fill(false)
    console.log(dfs(start, end, visit, 0))
}

function dfs(start, end, visit, cost) {
    visit[start] = true;
    if (start === end) return cost;

    for (const [next, nextCost] of graph[start]) {
        if (!visit[next]) {
            const result = dfs(next, end, visit, cost + nextCost);
            if (result !== undefined) return result;
        }
    }
}
