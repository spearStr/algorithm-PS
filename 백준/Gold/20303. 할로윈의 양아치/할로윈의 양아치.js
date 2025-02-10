const fs = require('fs')
const [first, second, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m, limit] = first.split(' ').map(Number)
const candies = [0, ...second.split(' ').map(Number)]
const visit = Array(n + 1).fill(false)

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
for (let i = 0; i < m; i++) {
    const [start, end] = input[i].split(' ').map(Number)
    graph[start].push(end)
    graph[end].push(start)
}

const parent = Array(n + 1).fill(0)
for (let i = 1; i <= n; i++) {
    parent[i] = i
}

function find(child) {
    if (parent[child] !== child) parent[child] = find(parent[child])
    return parent[child]
}

function union(node1, node2) {
    const root1 = find(node1)
    const root2 = find(node2)

    if (root1 !== root2) {
        if (root1 < root2) {
            parent[root2] = root1
        } else {
            parent[root1] = root2
        }
    }
}

function dfs(node) {
    visit[node] = true

    for (const friend of graph[node]) {
        if (!visit[friend]) dfs(friend)
        union(friend, node)
    }
}

for (let i = 1; i <= n; i++) {
    if (!visit[i]) dfs(i)
}

let knapsack = Array(n + 1).fill(null).map(() => [0, 0])

for (let i = 1; i <= n; i++) {
    const root = find(i)
    knapsack[root][0] += 1;
    knapsack[root][1] += candies[i];
}

knapsack = knapsack.filter(([_, value]) => value !== 0)

const dp = Array(limit).fill(0);

for (const [size, value] of knapsack) {
    for (let i = limit - 1; i >= size; i--) {
        dp[i] = Math.max(dp[i], dp[i - size] + value);
    }
}

console.log(Math.max(...dp));
