const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const board = input.map((line) => line.trim().split(''))

let red = []
let blue = []
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (board[i][j] === 'R') red = [i, j]
        if (board[i][j] === 'B') blue = [i, j]
    }
}

const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]]

function move(x, y, dx, dy) {
    let count = 0;
    while (board[x + dx][y + dy] !== "#" && board[x][y] !== "O") {
        x += dx
        y += dy
        count += 1
    }
    return [x, y, count];
}
  
function bfs(red, blue) {
    const queue = [[red[0], red[1], blue[0], blue[1], 0]];
    const visit = new Set();
    visit.add(`${red[0]},${red[1]},${blue[0]},${blue[1]}`);

    while (queue.length > 0) {
        let [redX, redY, blueX, blueY, count] = queue.shift();

        if (count >= 10) return -1;

        for (const [dx, dy] of directions) {
            let [newRedX, newRedY, redMoves] = move(redX, redY, dx, dy);
            let [newBlueX, newBlueY, blueMoves] = move(blueX, blueY, dx, dy);

            if (board[newBlueX][newBlueY] === "O") continue;
            if (board[newRedX][newRedY] === "O") return count + 1;

            if (newRedX === newBlueX && newRedY === newBlueY) {
                if (redMoves > blueMoves) {
                    newRedX -= dx;
                    newRedY -= dy;
                } else {
                    newBlueX -= dx;
                    newBlueY -= dy;
                }
            }

            if (!visit.has(`${newRedX},${newRedY},${newBlueX},${newBlueY}`)) {
                visit.add(`${newRedX},${newRedY},${newBlueX},${newBlueY}`);
                queue.push([newRedX, newRedY, newBlueX, newBlueY, count + 1]);
            }
        }
    }

    return -1;
}

console.log(bfs(red, blue));