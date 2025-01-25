class Queue {
    constructor() {
        this.q = [];
        this.head = 0;
        this.tail = 0;
    }

    push(item) {
        this.q[this.tail++] = item;
    }

    shift() {
        this.head += 1;
        return this.q[this.head - 1];
    }

    isEmpty() {
        return this.head === this.tail;
    }
}

const fs = require('fs');
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [height, width] = firstLine.split(' ').map(Number);

const board = [];
for (let line of input) {
    board.push(line.trim().split('').map(Number));
}

const directions = [
    [-1, 0], 
    [0, -1], 
    [0, 1], 
    [1, 0], 
];

bfs();

function bfs() {
    const visit = Array(height)
        .fill(null)
        .map(() =>
            Array(width)
                .fill(null)
                .map(() => Array(2).fill(false))
        );

    const queue = new Queue();
    queue.push([0, 0, 1, 0]);
    visit[0][0][0] = true;

    while (!queue.isEmpty()) {
        const [x, y, time, count] = queue.shift();

        if (x === height - 1 && y === width - 1) {
            console.log(time);
            return;
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
                if (board[newX][newY] === 0 && !visit[newX][newY][count]) {
                    queue.push([newX, newY, time + 1, count]);
                    visit[newX][newY][count] = true;
                }
                else if (board[newX][newY] === 1 && count === 0 && !visit[newX][newY][1]) {
                    queue.push([newX, newY, time + 1, 1]);
                    visit[newX][newY][1] = true;
                }
            }
        }
    }

    console.log(-1);
}
