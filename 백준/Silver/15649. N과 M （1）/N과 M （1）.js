const fs = require('fs')
const [n, m] = fs.readFileSync('dev/stdin').toString().trim().split(' ').map(Number)

const visited = new Array(n + 1).fill(false);
const answer = [];

function backtrack(depth, sequence) {
    if (depth === m) {
        answer.push(sequence.join(" "));
        return
    }

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
            visited[i] = true;
            sequence.push(i);
            backtrack(depth + 1, sequence);
            sequence.pop();
            visited[i] = false;
        }
    }
}

backtrack(0, [])

console.log(answer.join('\n'))