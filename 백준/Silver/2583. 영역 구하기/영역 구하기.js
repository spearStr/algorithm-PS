const fs = require('fs')
const [first, ...lines] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const [m, n, k] = first.split(' ').map(Number)

const coordinates = []
for (let i = 0; i < k; i++) {
    const [x1, y1, x2, y2] = lines[i].trim().split(' ').map(Number)
    coordinates.push([x1, y1, x2, y2])
}

const board = Array(m).fill().map(() => Array(n).fill(0))

for (const [x1, y1, x2, y2] of coordinates) {
    for (let row = y1; row < y2; row++) {
        for (let col = x1; col < x2; col++) {
            board[row][col] = 1
        }
    }
}

const answer = []

const direction = [[-1, 0], [0, -1], [0, 1], [1, 0]]

function bfs(row, col) {
    const queue = [[row, col]]

    board[row][col] = 1

    let count = 1
    while (queue.length > 0) {
        const [x, y] = queue.shift()

        for (let [dx, dy] of direction) {
            const newX = x + dx
            const newY = y + dy
            if (0 <= newX && newX < m && 0 <= newY && newY < n && board[newX][newY] === 0) {
                queue.push([newX, newY])
                board[newX][newY] = 1
                count += 1
            }
        }
    }

    return count
}

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (board[i][j] === 0) {
            answer.push(bfs(i, j))
        }
    }
}

console.log(answer.length)
console.log(answer.sort((a, b) => a - b).join(' '))