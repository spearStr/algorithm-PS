const fs = require('fs')
const [first, input] = fs.readFileSync(fs.existsSync('dev/stdin') ? '/dev/stdin' : 'input.txt').toString().trim().split('\n')

const [N, S, M] = first.split(' ').map(Number)
const volumns = input.split(' ').map(Number)

const dp = Array(N + 1).fill(null).map(() => Array(M + 1).fill(false))
dp[0][S] = true

for (let i = 1; i <= N; i++) {
    for (let j = 0; j <= M; j++) {
        if (dp[i - 1][j]) {
            const up = j + volumns[i - 1]
            const down = j - volumns[i - 1]
            if (up <= M) dp[i][up] = true
            if (down >= 0) dp[i][down] = true
        }
    }
}

let answer = -1
for (let v = M; v >= 0; v--) {
    if (dp[N][v]) {
        answer = v
        break
    }
}

console.log(answer)
