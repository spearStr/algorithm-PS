const fs = require('fs')
const [first, ...input] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const [n, m] = first.split(' ').map(Number)
const board = input.map((line) => line.trim().split(''))

const sVisit = Array(n).fill(null).map(() => Array(m).fill(false))
const wVisit = Array(n).fill(null).map(() => Array(m).fill(false))

const sQueue = []
const wQueue = []

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (board[i][j] === '*') {
            wQueue.push([i, j])
            wVisit[i][j] = true
        }
        if (board[i][j] === 'S') {
            sQueue.push([i, j, 0])
            sVisit[i][j] = true
            board[i][j] = '.'
        }
    }
}

const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]]

function bfs() {

    let wLimit = wQueue.length
    let sLimit = sQueue.length

    while (sQueue.length > 0) {
        for (let i = 0; i < sLimit; i++) {
            const [x, y, count] = sQueue.shift()

            if (board[x][y] === '*') continue
    
            for (const [dx, dy] of directions) {
                const newX = x + dx
                const newY = y + dy
    
                if (0 <= newX && newX < n && 0 <= newY && newY < m && !sVisit[newX][newY]) {
                    if (board[newX][newY] === 'D') {
                        return count + 1
                    }
    
                    if (board[newX][newY] === '.') {
                        sVisit[newX][newY] = true
                        sQueue.push([newX, newY, count + 1])
                    }
                }
            }
        }

        sLimit = sQueue.length

        for (let i = 0; i < wLimit; i++) {
            const [x, y] = wQueue.shift()

            for (const [dx, dy] of directions) {
                const newX = x + dx
                const newY = y + dy
    
                if (0 <= newX && newX < n && 0 <= newY && newY < m && !wVisit[newX][newY] && board[newX][newY] === '.') {
                    wVisit[newX][newY] = true
                    wQueue.push([newX, newY])
                    board[newX][newY] = '*'
                }
            }
        }

        wLimit = wQueue.length
    }

    return -1
}

const answer = bfs()
if (answer === -1) {
    console.log("KAKTUS")
} else {
    console.log(answer)
}