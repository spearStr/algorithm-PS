const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const t = Number(firstLine);

let answer = 0;
let line = 0;

for (let i = 0; i < t; i++) {
    const n = Number(input[line++]);
    const students = [0, ...input[line++].trim().split(' ').map(Number)];
    const visit = Array(n + 1).fill(false);
    const done = Array(n + 1).fill(false);

    for (let i = 1; i < n + 1; i++) {
        if (visit[i]) continue;

        dfs(i, students, visit, done);
    }

    console.log(n - answer)
    answer = 0
}

function dfs(node, students, visit, done) {
    visit[node] = true;
    const next = students[node];

    if (!visit[next]) dfs(next, students, visit, done);
    else if (!done[next]) {
        for (let i = next; i !== node; i = students[i]) {
            answer += 1;
        }

        answer += 1;
    }

    done[node] = true;
}
