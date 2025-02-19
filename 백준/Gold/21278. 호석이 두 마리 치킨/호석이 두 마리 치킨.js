const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const info = input.map((line) => line.split(' ').map(Number))
const graph = Array(n + 1).fill(null).map(() => Array(n + 1).fill(Infinity))

for (let i = 1; i <= n; i++) graph[i][i] = 0;

for (const [start, end] of info) {
    graph[start][end] = 1;
    graph[end][start] = 1;
}

for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
        }
    }
}

let answer = Infinity;
let answerNode = [];

for (let i = 1; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
        let count = 0;
        for (let k = 1; k <= n; k++) {
            count += Math.min(graph[k][i], graph[k][j]) * 2;
        }

        if (count < answer) {
            answer = count;
            answerNode = [i, j, answer];
        }
    }
}

console.log(answerNode.join(' '));