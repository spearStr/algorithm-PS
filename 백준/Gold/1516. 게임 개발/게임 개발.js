const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const N = Number(firstLine)

const graph = Array(N + 1).fill(null).map(() => Array(0).fill([]))
const visit = Array(N + 1).fill(false)
const dp = Array(N + 1).fill(null);

for (let i = 0; i < N; i++) {
    const [cost, ...prevWorks] = input[i].trim().split(' ').slice(0, -1).map(Number)
    dp[i + 1] = cost

    for (const prev of prevWorks) {
        graph[i + 1].push(prev)
    }
}

function dfs(node) {
    if (visit[node]) return dp[node];

    visit[node] = true;

    let maxPrevTime = 0;
    for (const prev of graph[node]) {
        maxPrevTime = Math.max(maxPrevTime, dfs(prev));
    }

    dp[node] += maxPrevTime;
    return dp[node];
}

for (let i = 1; i <= N; i++) {
    if (!visit[i]) dfs(i);
}

console.log(dp.slice(1).join('\n'));