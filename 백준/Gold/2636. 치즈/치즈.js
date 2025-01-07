const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const [n, m] = firstLine.split(' ').map(Number);
const cheese = input.map((line) => {
    return line.trim().split(' ').map(Number);
});

const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];
let hour = 0;
let lastMeltingCheese = 0;

function dfs(x, y) {
    const visit = Array(n).fill(null).map(() => Array(m).fill(false))
    const stack = [[x, y]]

    let meltingCheese = 0;
    while (stack.length > 0) {
        const [x, y] = stack.pop()
        
        visit[x][y] = true
        for (let i = 0; i < 4; i++) {
            const newX = x + direction[i][0]
            const newY = y + direction[i][1]

            if (0 <= newX && newX < n && 0 <= newY && newY < m && !visit[newX][newY]) {
                if (cheese[newX][newY] === 0) {
                    stack.push([newX, newY])
                } else {
                    meltingCheese += 1
                    cheese[newX][newY] = 0
                }
                visit[newX][newY] = true
            }
        }
    }
    lastMeltingCheese = meltingCheese;
}

function getCheeseSum() {
    return cheese.reduce((sum, row) => sum + row.reduce((rowSum, value) => rowSum + value, 0), 0);
}

while (getCheeseSum() !== 0) {
    dfs(0, 0)
    hour += 1
}

console.log(hour)
console.log(lastMeltingCheese)