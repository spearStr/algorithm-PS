const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split(' ').map(Number);
const order = input.slice(0, -1);
const n = order.length;

function checkpoint(from, to) {
    if (from === to) return 1;
    if (from === 0) return 2;
    if (Math.abs(from - to) === 2) return 4;
    return 3;
}

function solution() {
    const dp = Array(n + 1).fill().map(() => Array(5).fill().map(() => Array(5).fill(Infinity)));

    dp[0][0][0] = 0;

    for (let i = 0; i < n; i++) {
        const pos = order[i];

        for (let left = 0; left < 5; left++) {
            for (let right = 0; right < 5; right++) {
                if (dp[i][left][right] === Infinity) continue;

                if (pos !== right) {
                    dp[i + 1][pos][right] = Math.min(dp[i + 1][pos][right], dp[i][left][right] + checkpoint(left, pos));
                }

                if (pos !== left) {
                    dp[i + 1][left][pos] = Math.min(dp[i + 1][left][pos], dp[i][left][right] + checkpoint(right, pos));
                }
            }
        }
    }

    let answer = Infinity;
    for (let left = 0; left < 5; left++) {
        for (let right = 0; right < 5; right++) {
            answer = Math.min(answer, dp[n][left][right]);
        }
    }
    console.log(answer);
}

solution();
