const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [row, col, n] = firstLine.split(' ').map(Number)
const sharkInfo = input.map((line) => line.split(' ').map(Number))

const board = Array(row).fill(null).map(() => Array(col).fill(null).map(() => []))
for (const info of sharkInfo) {
    const [x, y, speed, direction, power] = info
    board[x - 1][y - 1].push([0, speed, direction, power])
}

function move (x, y, speed, direction) {
    if (direction === 1 || direction === 2) {
        const cycle = (2 * row) - 2;
  
        if (direction === 1) {
            speed += 2 * (row - 1) - x;
        }
        else {
            speed += x
        }
  
        speed %= cycle;

        if (speed >= row) {
            return [cycle - speed, y, 1];
        }
        else {
            return [speed, y, 2];
        }
    }

    else {
        const cycle = (2 * col) - 2;

        if (direction === 4) {
            speed += 2 * (col - 1) - y;
        }
        else {
            speed += y;
        }

        speed %= cycle;

        if (speed >= col) {
            return [x, cycle - speed, 4];
        }
        else {
            return [x, speed, 3];
        }
    }
}


let answer = 0

for (let i = 0; i < col; i++) {
    for (let sharkRow = 0; sharkRow < row; sharkRow++) {
        if (board[sharkRow][i].length !== 0) {
            const [_, __, ___, power] = board[sharkRow][i][0];
            answer += power;
            board[sharkRow][i].pop();
            break;
        }
    }

    const newBoard = Array(row).fill(null).map(() => Array(col).fill(null).map(() => []));
    for (let sharkRow = 0; sharkRow < row; sharkRow++) {
        for (let sharkCol = 0; sharkCol < col; sharkCol++) {
            if (board[sharkRow][sharkCol].length > 0) {
                const [time, speed, direction, power] = board[sharkRow][sharkCol][0];
                const [nextX, nextY, nextDirection] = move(sharkRow, sharkCol, speed, direction);
                newBoard[nextX][nextY].push([time + 1, speed, nextDirection, power]);
            }
        }
    }

    for (let sharkRow = 0; sharkRow < row; sharkRow++) {
        for (let sharkCol = 0; sharkCol < col; sharkCol++) {
            if (newBoard[sharkRow][sharkCol].length > 1) {
                newBoard[sharkRow][sharkCol].sort((a, b) => b[3] - a[3]);
                newBoard[sharkRow][sharkCol] = [newBoard[sharkRow][sharkCol][0]];
            }
        }
    }

    board.forEach((row, i) => {
        row.forEach((_, j) => {
            board[i][j] = [...newBoard[i][j]];
        });
    });
}

console.log(answer)