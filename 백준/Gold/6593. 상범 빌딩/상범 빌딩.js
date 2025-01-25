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

    length() {
        return this.tail - this.head;
    }
}

const fs = require('fs');
const [...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const direction = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
];

let line = 0;
while (line < input.length) {
    const [L, R, C] = input[line].trim().split(' ').map(Number);
    line += 1;

    if (L === 0 && R === 0 && C === 0) break;

    const building = Array(L)
        .fill(null)
        .map(() => Array(R).fill(null));
    const visit = Array(L)
        .fill(null)
        .map(() =>
            Array(R)
                .fill(null)
                .map(() => Array(C).fill(false))
        );

    for (let i = 0; i < L; i++) {
        for (let j = 0; j < R; j++) {
            building[i][j] = input[line].trim().split('');
            line += 1;
        }
        line += 1;
    }

    bfs(L, R, C, building, visit);
}

function bfs(L, R, C, building, visit) {
    const queue = new Queue();

    let endPoint = [];
    for (let i = 0; i < L; i++) {
        for (let j = 0; j < R; j++) {
            for (let k = 0; k < C; k++) {
                if (building[i][j][k] === 'S') {
                    queue.push([i, j, k, 0]);
                    visit[i][j][k] = true;
                } else if (building[i][j][k] === 'E') {
                    endPoint = [i, j, k];
                }
            }
        }
    }

    while (!queue.isEmpty()) {
        const [z, y, x, time] = queue.shift()

        if (z === endPoint[0] && y === endPoint[1] && x === endPoint[2]) {
            console.log(`Escaped in ${time} minute(s).`)
            return
        }

        for (const [dz, dy, dx] of direction) {
            const newZ = dz + z
            const newY = dy + y
            const newX = dx + x
            if (newX >= 0 && newX < C && newY >= 0 && newY < R && newZ >= 0 && newZ < L && !visit[newZ][newY][newX] && (building[newZ][newY][newX] === '.' || building[newZ][newY][newX] === 'E')) {
                queue.push([newZ, newY, newX, time + 1])
                visit[newZ][newY][newX] = true
            }
        }
    }
    console.log('Trapped!')
}
