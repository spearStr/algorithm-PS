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
        this.head++;
        return this.q[this.head - 1];
    }

    isEmpty() {
        return this.head === this.tail;
    }

    get length() {
        return this.tail - this.head;
    }
}

const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const directions = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
];

const [x, y] = firstLine.split(' ').map(Number);
const building = [];
const visit = Array.from({ length: x }, () => Array(y).fill(false));
const fireVisit = Array.from({ length: x }, () => Array(y).fill(false));

for (const line of input) {
    building.push(line.trim().split(''));
}

const result = bfs(building, visit, fireVisit, y, x);
console.log(result);

function bfs(building, visit, fireVisit, width, height) {
    const personQueue = new Queue();
    const fireQueue = new Queue();

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (building[i][j] === 'J') {
                personQueue.push([i, j, 0]);
                visit[i][j] = true;
            } else if (building[i][j] === 'F') {
                fireQueue.push([i, j]);
                fireVisit[i][j] = true;
            }
        }
    }

    while (!personQueue.isEmpty()) {
        const fireLength = fireQueue.length;
        for (let f = 0; f < fireLength; f++) {
            const [fx, fy] = fireQueue.shift();
            for (const [dx, dy] of directions) {
                const newFx = fx + dx;
                const newFy = fy + dy;

                if (
                    newFx >= 0 &&
                    newFx < height &&
                    newFy >= 0 &&
                    newFy < width &&
                    !fireVisit[newFx][newFy] &&
                    (building[newFx][newFy] === '.' ||
                        building[newFx][newFy] === 'J')
                ) {
                    fireVisit[newFx][newFy] = true;
                    building[newFx][newFy] = 'F';
                    fireQueue.push([newFx, newFy]);
                }
            }
        }

        const personLength = personQueue.length;
        for (let p = 0; p < personLength; p++) {
            const [px, py, time] = personQueue.shift();
            if (px === 0 || px === height - 1 || py === 0 || py === width - 1) {
                return time + 1;
            }

            for (const [dx, dy] of directions) {
                const newPx = px + dx;
                const newPy = py + dy;

                if (
                    newPx >= 0 &&
                    newPx < height &&
                    newPy >= 0 &&
                    newPy < width &&
                    !visit[newPx][newPy] &&
                    building[newPx][newPy] === '.'
                ) {
                    visit[newPx][newPy] = true;
                    personQueue.push([newPx, newPy, time + 1]);
                }
            }
        }
    }

    return 'IMPOSSIBLE';
}
