const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)

let line = 0
const board = []
for (let i = 0; i < n; i++) {
    board.push(input[line++].split(' ').map(Number))
}

const queries = []
for (let i = 0; i < m; i++) {
    queries.push(input[line++].split(' ').map(Number))
}

const distance = Array(n + 1).fill(null).map(() => Array(n + 1).fill(Infinity))

function floydWarshall() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            distance[i + 1][j + 1] = board[i][j]
        }
    }

    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (distance[i][j] > distance[i][k] + distance[k][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j]
                }
            }
        }
    }
}

floydWarshall()

const answer = []
for (const query of queries) {
    const [start, end, cost] = query
    if (distance[start][end] > cost) {
        answer.push('Stay here')
    } else {
        answer.push('Enjoy other party')
    }
}

console.log(answer.join('\n'))