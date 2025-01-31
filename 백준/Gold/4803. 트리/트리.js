const fs = require('fs')
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n')

let line = 0;
let testCase = 1;
while (true) {
    const [n, m] = input[line++].split(' ').map(Number)

    if (n === 0 && m === 0) break;

    const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
    const visit = Array(n + 1).fill(0)
    for (let i = 0; i < m; i++) {
        const [start, end] = input[line++].split(' ').map(Number)
        graph[start].push(end)
        graph[end].push(start)
    }

    let answer = 0;
    for (let i = 1; i <= n; i++) {
        if (visit[i] === 0) {
            if (dfs(i, -1, graph, visit)) answer += 1
        }
    }

    if (answer === 0) {
        console.log(`Case ${testCase}: No trees.`)
    } else if (answer === 1) {
        console.log(`Case ${testCase}: There is one tree.`)
    } else {
        console.log(`Case ${testCase}: A forest of ${answer} trees.`)
    }

    testCase += 1
}

function dfs(start, parent, graph, visit) {
    visit[start] = 1

    for (const next of graph[start]) {   
        if (next === parent) continue

        if (visit[next] === 0) {
            if (!dfs(next, start, graph, visit)) {
                return false
            }
        } else if (visit[next] === 1) {
            return false
        }
    }

    visit[start] = 2
    return true
}