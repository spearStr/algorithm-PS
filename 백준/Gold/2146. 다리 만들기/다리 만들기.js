const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const n = Number(firstLine);

const islandMap = input.map((line) => {
    return line.trim().split(' ').map(Number);
});

const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];
const islandGroup = [];

function dfs(x, y, groupNumber, visit) {
    const stack = [[x, y]];
    visit[x][y] = true;
    while (stack.length > 0) {
        const [x, y] = stack.pop();
        islandGroup.push({
            x,
            y,
            groupNumber,
            answer: -1,
        });
        for (let i = 0; i < 4; i++) {
            const newX = x + direction[i][0];
            const newY = y + direction[i][1];
            if (
                0 <= newX &&
                newX < n &&
                0 <= newY &&
                newY < n &&
                islandMap[newX][newY] === 1 &&
                !visit[newX][newY]
            ) {
                stack.push([newX, newY]);
                visit[newX][newY] = true;
            }
        }
    }
}

function getIslandGroup() {
    const visit = Array(n)
        .fill(null)
        .map(() => Array(n).fill(false));

    let groupNumber = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (islandMap[i][j] === 1 && !visit[i][j]) {
                dfs(i, j, groupNumber, visit);
                groupNumber += 1;
            }
        }
    }
}

function bfs(x, y) {
    const visit = Array(n)
        .fill(null)
        .map(() => Array(n).fill(false));
    const queue = [[x, y, 0]];

    const currentIsland = islandGroup.find(
        (island) => island.x === x && island.y === y
    );

    while (queue.length > 0) {
        const [x, y, distance] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const newX = x + direction[i][0];
            const newY = y + direction[i][1];
            if (
                0 <= newX &&
                newX < n &&
                0 <= newY &&
                newY < n &&
                !visit[newX][newY]
            ) {
                if (islandMap[newX][newY] === 0) {
                    queue.push([newX, newY, distance + 1]);
                    visit[newX][newY] = true;
                } else {
                    const targetIsland = islandGroup.find(
                        (island) => island.x === newX && island.y === newY
                    );

                    if (targetIsland.groupNumber !== currentIsland.groupNumber) {
                        currentIsland.answer = Math.min(
                            currentIsland.answer === -1 ? Infinity : currentIsland.answer,
                            distance
                        );
                        break;
                    }
                }
            }
        }
    }
}

function solution() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (islandMap[i][j] === 1) {
                bfs(i, j);
            }
        }
    }
    const minAnswer = Math.min(
        ...islandGroup
            .filter((island) => island.answer > 0)
            .map((island) => island.answer)
    );

    console.log(minAnswer);
}

getIslandGroup();
solution();
