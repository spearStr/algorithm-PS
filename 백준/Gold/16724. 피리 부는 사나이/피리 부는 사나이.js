const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [height, width] = firstLine.split(' ').map(Number)
const board = input.map((line) => line.trim().split(''))
const visit = Array(height).fill(null).map(() => Array(width).fill(false))
const parent = Array(height).fill(null).map(() => Array(width).fill(null))

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        parent[i][j] = 1000 * i + j
    }
}

function find(x, y) {
    if (parent[x][y] !== 1000 * x + y) {
        parent[x][y] = find(Math.floor(parent[x][y] / 1000), parent[x][y] % 1000);
    }
    return parent[x][y]
}

function union(x1, y1, x2, y2) {
    const root1 = find(x1, y1);
    const root2 = find(x2, y2);

    if (root1 !== root2) {
        const [root1X, root1Y] = [Math.floor(root1 / 1000), root1 % 1000];
        const [root2X, root2Y] = [Math.floor(root2 / 1000), root2 % 1000];

        if (root1 < root2) parent[root2X][root2Y] = root1;
        else parent[root1X][root1Y] = root2;
    }
}

function moveNext(sign, x, y) {
    if (sign === 'D') return [x + 1, y]
    else if (sign === 'L') return [x, y - 1]
    else if (sign === 'R') return [x, y + 1]
    else return [x - 1, y]
}

function dfs(x, y) {
    visit[x][y] = true

    const [nextX, nextY] = moveNext(board[x][y], x, y)

    if (visit[nextX][nextY]) {
        if (find(x, y) !== find(nextX, nextY)) {
            union(x, y, nextX, nextY);
        }
    } else {
        dfs(nextX, nextY)
        union(x, y, nextX, nextY);
    }

}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++){
        if (!visit[i][j]) dfs(i, j)
    }
}

let answer = new Set()
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++){
        answer.add(find(i, j));
    }
}

console.log(answer.size)