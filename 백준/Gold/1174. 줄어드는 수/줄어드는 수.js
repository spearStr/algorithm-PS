const fs = require('fs')
const firstLine = fs.readFileSync('dev/stdin').toString().trim()

const N = Number(firstLine)

function findDecreasingNumber(N) {
    const arr = [];
    const answer = new Set();

    function dfs() {
        const arrLen = arr.length

        if (arrLen > 0) {
            answer.add(Number(arr.join('')));
        }

        for (let i = 0; i < 10; i++) {
            if (arrLen === 0 || arr[arrLen - 1] > i) {
                arr.push(i);
                dfs();
                arr.pop();
            }
        }
    }

    dfs();

    const sortedAnswer = Array.from(answer).sort((a, b) => a - b);

    return sortedAnswer[N - 1] ?? -1;
}

console.log(findDecreasingNumber(N));