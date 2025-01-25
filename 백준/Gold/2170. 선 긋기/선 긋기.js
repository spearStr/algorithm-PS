const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const N = Number(firstLine);
const lines = [];

let answer = 0;
for (const line of input) {
    const [start, end] = line.trim().split(' ').map(Number);
    lines.push([start, end]);
}

lines.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let answerLine = lines[0];
for (let i = 1; i < lines.length; i++) {
    const [start, end] = lines[i];

    if (start === answerLine[0]) {
        answerLine[1] = end;
    }

    if (start <= answerLine[1]) {
        answerLine[1] = Math.max(answerLine[1], end);
    } else {
        answer += answerLine[1] - answerLine[0];
        answerLine = lines[i];
    }
}

answer += answerLine[1] - answerLine[0];

console.log(answer);
