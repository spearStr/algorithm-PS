const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const info = input.map((line) => line.split(' ').map(Number))

const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]]

const board = Array(n + 1).fill(null).map(() => Array(n + 1).fill(0))
const visit = Array(n + 1).fill(null).map(() => Array(n + 1).fill(false))

const graph = Array(n + 1).fill(null).map(() => Array(n + 1).fill(null).map(() => Array(0).fill([])))
for (let i = 0; i < m; i++) {
    const [x, y, targetX, targetY] = info[i]
    graph[x][y].push([targetX, targetY])
}

function bfs() {
    let queue = [[1, 1]];
    visit[1][1] = true;
    board[1][1] = 1;

    while (queue.length) {
        let newQueue = [];
        let turnedOn = false;
        let newVisitQueue = []

        for (const [x, y] of queue) {
            for (const [a, b] of graph[x][y]) {
                if (board[a][b] === 0) {
                    board[a][b] = 1;
                    turnedOn = true;
                    newVisitQueue.push([a, b]);
                }
            }

            for (const [dx, dy] of directions) {
                const newX = x + dx
                const newY = y + dy;
                if (newX >= 1 && newX <= n && newY >= 1 && newY <= n && board[newX][newY] === 1 && !visit[newX][newY]) {
                    visit[newX][newY] = true;
                    newQueue.push([newX, newY]);
                }
            }
        }

        if (turnedOn) {
            for (const [a, b] of newVisitQueue) {
                for (const [dx, dy] of directions) {
                    const newX = a + dx
                    const newY = b + dy;
                    if (newX >= 1 && newX <= n && newY >= 1 && newY <= n && visit[newX][newY]) {
                        visit[a][b] = true;
                        newQueue.push([a, b]);
                        break;
                    }
                }
            }
        }

        queue = newQueue;
    }
}

bfs()

let answer = 0
for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
        if (board[i][j] === 1) answer += 1
    }
}

console.log(answer)