const fs = require('fs')
const [first, ...lines] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const [n, m] = first.split(' ').map(Number)
const board = []

for (let i = 0; i < n; i++) {
    const list = lines[i].split(' ').map(Number)
    board.push(list)
}

const answer = Array(2*n + 2*m + 1).fill(-1)

const up = [-1, 0]
const down = [1, 0]
const right = [0, 1]
const left = [0, -1]

function travel(node) {
    let direction;
    let start;

    if (node <= n) {
        direction = right
        start = [node - 1, 0]
    } else if (node > n && node <= m + n) {
        direction = up
        start = [n - 1, node - n - 1]
    } else if (node > n + m && node <= m + 2*n) {
        direction = left
        start = [2*n + m - node, m - 1]
    } else {
        direction = down
        start = [0, 2*n + 2*m - node]
    }

    let [x, y] = start
    
    while (x >= 0 && x < n && y >= 0 && y < m) {
        if (board[x][y] === 0) {
            x += direction[0]
            y += direction[1]
        } else {
            if (direction === up) direction = right
            else if (direction === down) direction = left
            else if (direction === right) direction = up
            else direction = down

            x += direction[0]
            y += direction[1]
        }
    }

    let exit;

    if (y === -1) exit = x + 1
    else if (x === n) exit = x + 1 + y
    else if (y === m) exit = 2*n + m - x
    else exit = 2*n + 2*m - y

    answer[exit] = node
    answer[node] = exit
}

for (let i = 1; i <= 2*m + 2*n; i++) {
    if (answer[i] === -1) travel(i)
}

console.log(answer.slice(1).join(' '))