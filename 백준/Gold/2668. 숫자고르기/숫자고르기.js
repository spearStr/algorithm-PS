const fs = require('fs')
const [first, ...input] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const n = Number(first)
const numbers = [-1, ...input.map(Number)]

const answer = new Set()

for (let i = 1; i <= n; i++) {
    const visit = Array(n + 1).fill(false)
    let candidate = []

    if (dfs(i, visit, i, candidate)) {
        candidate.forEach(num => answer.add(num))
    }
}

function dfs(node, visit, firstNode, candidate) {
    if (visit[node]) return false

    visit[node] = true
    candidate.push(node)

    const next = numbers[node]
    if (next === firstNode) {
        return true
    } else {
        if (dfs(next, visit, firstNode, candidate)) return true
    }

    return false
}

const result = Array.from(answer).sort((a, b) => a - b)
console.log(result.length)
console.log(result.join('\n'))
