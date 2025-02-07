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

    length() {
        return this.tail - this.head;
    }
}

const fs = require('fs');
const [first, second, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const [n, m, players] = first.split(' ').map(Number);
const playerInfo = second.split(' ').map(Number);
const board = input.map((line) => line.trim().split(''));

const visit = Array(n)
    .fill(null)
    .map(() =>
        Array(m)
            .fill(null)
            .map(() => Array(players).fill(false))
    );

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const queue = Array(players)
    .fill(null)
    .map(() => new Queue());

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (board[i][j] !== '.' && board[i][j] !== '#') {
            const player = Number(board[i][j]) - 1;
            visit[i][j][player] = true;
            queue[player].push([i, j]);
        }
    }
}

let moved = true;
while (moved) {
    moved = false;
    for (let player = 0; player < players; player++) {
        let playerQueue = queue[player];
        let steps = playerInfo[player];

        while (steps-- > 0 && playerQueue.length() > 0) {
            let nextQueue = new Queue()
            while (playerQueue.length() > 0) {
                const [x, y] = playerQueue.shift();

                for (const [dx, dy] of directions) {
                    const newX = x + dx;
                    const newY = y + dy;
                    if (
                        0 <= newX && newX < n &&
                        0 <= newY && newY < m &&
                        !visit[newX][newY][player] &&
                        board[newX][newY] === '.'
                    ) {
                        visit[newX][newY][player] = true;
                        board[newX][newY] = String(player + 1);
                        nextQueue.push([newX, newY]);
                        moved = true;
                    }
                }
            }
            playerQueue = nextQueue;
        }
        queue[player] = playerQueue;
    }
}

let answer = Array(players).fill(0);
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        const target = Number(board[i][j]);
        if (!isNaN(target)) {
            answer[target - 1] += 1;
        }
    }
}

console.log(answer.join(' '));
