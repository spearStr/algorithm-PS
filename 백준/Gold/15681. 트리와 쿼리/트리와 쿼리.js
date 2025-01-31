const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, root, query] = firstLine.split(' ').map(Number)

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
const childNum = Array(n + 1).fill(1)
const visit = Array(n + 1).fill(false)

let line = 0;
for (let i = 0; i < n - 1; i++) {
    const [start, end] = input[line++].split(' ').map(Number)
    graph[start].push(end)
    graph[end].push(start)
}

dfs(root)

for (let i = 0; i < query; i++) {
    const question = Number(input[line++])
    console.log(childNum[question])
}

function dfs(node) {
    visit[node] = true

    for (const next of graph[node]) {
        if (!visit[next]) {
            dfs(next)
            childNum[node] += childNum[next]
        }
    }
}
