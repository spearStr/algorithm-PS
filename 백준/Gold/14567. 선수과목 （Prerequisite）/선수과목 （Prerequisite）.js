const fs = require('fs');
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [n, m] = firstLine.split(' ').map(Number);
const infos = input.map((line) => line.split(' ').map(Number));

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
const indegree = Array(n + 1).fill(0);
const semester = Array(n + 1).fill(0);

for (const [prev, cur] of infos) {
    graph[prev].push(cur);
    indegree[cur] += 1
}

const queue = [];
for (let i = 1; i <= n; i++) {
    if (indegree[i] === 0) {
        queue.push(i);
        semester[i] = 1;
    }
}

while (queue.length) {
    const current = queue.shift();

    for (const next of graph[current]) {
        indegree[next] -= 1

        if (indegree[next] === 0) {
            queue.push(next);
            semester[next] = semester[current] + 1;
        }
    }
}

console.log(semester.slice(1).join(' '));
