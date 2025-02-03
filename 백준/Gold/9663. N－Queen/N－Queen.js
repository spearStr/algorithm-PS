const fs = require('fs');
const N = Number(fs.readFileSync('dev/stdin').toString().trim());

const board = Array(N).fill(null).map(() => Array(N).fill(0));

function isSafe(x, y) {
    for (let i = 0; i < x; i++) {
        if (board[i][y] === 1) return false;
    }

    for (let i = x, j = y; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }

    for (let i = x, j = y; i >= 0 && j < N; i--, j++) {
        if (board[i][j] === 1) return false;
    }

    return true;
}

function NQueen(row) {
    if (row === N) {
        answer += 1;
        return;
    }

    for (let col = 0; col < N; col++) {
        if (isSafe(row, col)) {
            board[row][col] = 1;
            NQueen(row + 1);
            board[row][col] = 0;
        }
    }
}

let answer = 0;
if (N === 1) {
    console.log(1);
} else if (N < 4) {
    console.log(0);
} else {
    NQueen(0);
    console.log(answer);
}
