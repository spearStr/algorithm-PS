const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.trim().split(' ').map(Number)
const board = input.map((line) => line.trim().split(' ').map(Number))

const dp = Array(n).fill(null).map(() => Array(m).fill(-1))

const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]]

function dfs(x, y) {
    if (x === n - 1 && y === m - 1) return 1

    if (dp[x][y] !== -1) return dp[x][y]
    dp[x][y] = 0;
    for (const [dx, dy] of directions) {
        const newX = x + dx
        const newY = y + dy
        if (0 <= newX && newX < n && 0 <= newY && newY < m && board[x][y] > board[newX][newY]) {
            dp[x][y] += dfs(newX, newY)
        }
    }

    return dp[x][y]
}

console.log(dfs(0, 0))