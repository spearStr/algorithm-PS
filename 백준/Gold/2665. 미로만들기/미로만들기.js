const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)

const mazeInfo = Array.from({ length: n }, (_, i) => {
  return input[i].split('').map(value => ({
    value: Number(value),
    visit: false,
    answer: 0,
  }));
});

const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function bfs() {
    const queue = [[0, 0]]
    mazeInfo[0][0].visit = true

    while (queue.length > 0) {
        const [x, y] = queue.shift()

        for (const [dx, dy] of direction) {
            const newX = x + dx
            const newY = y + dy
            if (0 <= newX && newX < n && 0 <= newY && newY < n && !mazeInfo[newX][newY].visit) {
                let area = mazeInfo[newX][newY]
                if (area.value === 1) {
                    queue.unshift([newX, newY])
                    area.answer = mazeInfo[x][y].answer
                } else {
                    queue.push([newX, newY])
                    area.answer = mazeInfo[x][y].answer + 1
                }
                area.visit = true
            }
        }
    }
    console.log(mazeInfo[n - 1][n - 1].answer)
}

bfs()