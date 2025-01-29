const fs = require('fs');
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [height, width, target] = firstLine.split(' ').map(Number);
const board = input.map(line => line.trim().split(''));

const whiteStart = Array(height).fill(null).map(() => Array(width).fill(0))
const blackStart = Array(height).fill(null).map(() => Array(width).fill(0))

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        const isWhite = (i + j) % 2 === 0;
        if (isWhite) {
            whiteStart[i][j] = board[i][j] === 'W' ? 0 : 1;
            blackStart[i][j] = board[i][j] === 'B' ? 0 : 1;
        } else {
            whiteStart[i][j] = board[i][j] === 'B' ? 0 : 1;
            blackStart[i][j] = board[i][j] === 'W' ? 0 : 1;
        }
    }
}

const psWhite = Array(height + 1).fill(null).map(() => Array(width + 1).fill(0))
const psBlack = Array(height + 1).fill(null).map(() => Array(width + 1).fill(0))

for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
        psWhite[i][j] = whiteStart[i - 1][j - 1] + psWhite[i - 1][j] + psWhite[i][j - 1] - psWhite[i - 1][j - 1];
        psBlack[i][j] = blackStart[i - 1][j - 1] + psBlack[i - 1][j] + psBlack[i][j - 1] - psBlack[i - 1][j - 1];
    }
}

let minCost = Infinity;

for (let i = target; i <= height; i++) {
    for (let j = target; j <= width; j++) {
        const whiteCost = psWhite[i][j] - psWhite[i - target][j] - psWhite[i][j - target] + psWhite[i - target][j - target];
        const blackCost = psBlack[i][j] - psBlack[i - target][j] - psBlack[i][j - target] + psBlack[i - target][j - target];
        minCost = Math.min(minCost, whiteCost, blackCost);
    }
}

console.log(minCost);
