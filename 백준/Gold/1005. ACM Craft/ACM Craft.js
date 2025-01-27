const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const t = Number(firstLine)
let line = 0;
for (let i = 0; i < t; i++) {
    const [n, k] = input[line++].trim().split(' ').map(Number)
    const building = input[line++].trim().split(' ').map(Number)
    const visit = Array(n + 1).fill(false)
    const dp = Array(n + 1).fill(0)

    const rules = Array(n + 1).fill(null).map(() => Array(0).fill([]))
    for (let j = 0; j < k; j++) {
        const [start, end] = input[line++].trim().split(' ').map(Number)
        rules[end].push(start)
    }
    const target = Number(input[line++])

    const dfs = (node) => {
        if (visit[node]) return dp[node]

        visit[node] = true

        let prevMaxCost = 0;
        for (const next of rules[node]) {
            prevMaxCost = Math.max(prevMaxCost, dfs(next))
        }

        dp[node] += prevMaxCost + building[node - 1]
        return dp[node]
    }

    dfs(target)

    console.log(dp[target])
}