const fs = require('fs');
const input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');

const n = Number(input[0]);
const inputData = input.slice(1);

const score = inputData.map((line) => line.split(' '));

score.sort((a, b) => {
    if (Number(a[1]) !== Number(b[1])) return Number(b[1]) - Number(a[1]);
    if (Number(a[2]) !== Number(b[2])) return Number(a[2]) - Number(b[2]);
    if (Number(a[3]) !== Number(b[3])) return Number(b[3]) - Number(a[3]);
    return a[0] > b[0] ? 1 : -1;
});

console.log(score.map((student) => student[0]).join('\n'));