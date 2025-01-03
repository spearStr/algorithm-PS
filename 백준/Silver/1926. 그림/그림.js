const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split('\n');

const [n, m] = firstLine.split(' ').map(Number);

const paper = input.map((line) => {
    return line.trim().split(' ').map(Number);
});

const artList = [];
const visit = new Array(n).fill(null).map(() => new Array(m).fill(false));
const dx = [-1, 0, 0, 1];
const dy = [0, 1, -1, 0];
const ans = [];

function dfs(x, y) {
    let cnt = 1;
    artList.push([x, y]);
    while (artList.length > 0) {
        const [newX, newY] = artList.pop();
        for (let i = 0; i < 4; i++) {
            if (
                0 <= newX + dx[i] &&
                newX + dx[i] < n &&
                0 <= newY + dy[i] &&
                newY + dy[i] < m &&
                paper[newX + dx[i]][newY + dy[i]] === 1 &&
                visit[newX + dx[i]][newY + dy[i]] === false
            ) {
                cnt += 1;
                visit[newX + dx[i]][newY + dy[i]] = true
                artList.push([newX + dx[i], newY + dy[i]]);
            }
        }
    }
    ans.push(cnt);
}

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (!visit[i][j] && paper[i][j] === 1) {
            visit[i][j] = true;
            dfs(i, j);
        }
    }
}

console.log(ans.length);
console.log(ans.length === 0 ? 0 : Math.max(...ans));
