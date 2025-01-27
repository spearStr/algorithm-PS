const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.toString().trim().split(' ').map(Number)
const programs = input.map((line) => line.trim().split(' ').map(Number))

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
const visit = Array(n + 1).fill(0)
const answer = []
let isCycle = false

for (let line of programs) {
    const [length, ...program] = line
    for (let i = 0; i < length; i++) {
        if (i !== length - 1) graph[program[i]].push(program[i + 1])
    }
}

function dfs(node) {
    if (visit[node] === 1) {
        isCycle = true
        return
    }

    if (visit[node] === 2) return

    visit[node] = 1
    for (const next of graph[node]) {
        dfs(next)
    }
    visit[node] = 2
    answer.push(node)

}

for (let i = 1; i <= n; i++) {
    if (visit[i] === 0) dfs(i)
}

if (isCycle) {
    console.log(0)
} else {
    console.log(answer.reverse().join('\n'))
}