const fs = require('fs');
const [...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const sudoku = Array(9).fill(0).map(() => Array(9).fill(0));
const emptyCells = [];
for (let i = 0; i < 9; i++) {
    const row = input[i].split('').map(Number);
    for (let j = 0; j < 9; j++) {
        sudoku[i][j] = row[j];
        if (row[j] === 0) {
            emptyCells.push([i, j]);
        }
    }
}

function backtrack(index) {
    if (index === emptyCells.length) {
        return true;
    }

    const [row, col] = emptyCells[index];
    for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, num)) {
            sudoku[row][col] = num;

            if (backtrack(index + 1)) return true;

            sudoku[row][col] = 0;
        }
    }
    return false;
}

function isValid(row, col, num) {
    const blockRowStart = Math.floor(row / 3) * 3;
    const blockColStart = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] === num || sudoku[i][col] === num ||
            sudoku[blockRowStart + Math.floor(i / 3)][blockColStart + i % 3] === num) {
            return false;
        }
    }
    return true;
}

backtrack(0);
sudoku.map(row => console.log(row.join('')));
