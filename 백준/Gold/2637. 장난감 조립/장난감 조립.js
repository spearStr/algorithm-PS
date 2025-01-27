const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const M = Number(input[1]);

const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
const graph = Array.from({ length: N + 1 }, () => []);
const visit = Array(N + 1).fill(false);

for (let i = 2; i < input.length; i++) {
    const [X, Y, K] = input[i].split(' ').map(Number);
    graph[X].push([Y, K]);
}

const dfs = (n, count, pre) => {
    if (graph[n].length === 0) {
        dp[pre][n] += count;
        return;
    }

    for (let i = 0; i < graph[n].length; i++) {
        const [nextPart, nextCount] = graph[n][i];
        if (!visit[nextPart]) {
            dfs(nextPart, nextCount, n);
        }
        for (let j = 1; j <= N; j++) {
            dp[n][j] += dp[nextPart][j] * nextCount;
        }
    }

    visit[n] = true;
};

dfs(N, 1, 0);

let answer = [];
for (let i = 1; i <= N; i++) {
    if (graph[i].length === 0) {
        answer.push(`${i} ${dp[N][i]}`)
    }
}

console.log(answer.join('\n'));
