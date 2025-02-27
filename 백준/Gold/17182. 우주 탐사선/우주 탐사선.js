const fs = require('fs')
const [first, ...input] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const [n, start] = first.split(' ').map(Number)
const board = input.map((line) => line.split(' ').map(Number))

const distance = Array(n).fill(null).map(() => Array(n).fill(Infinity))

function floydWarshall() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            distance[i][j] = board[i][j]
        }
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (distance[i][k] + distance[k][j] < distance[i][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j]
                }
            }
        }
    }
}

floydWarshall()

let answer = Infinity
const visit = Array(n).fill(false);

function dfs(node, count, cost) {
    if (count === n) {
        answer = Math.min(answer, cost)
        return
    }

    for (let next = 0; next < n; next++) {
        if (!visit[next] && node !== next) {
            visit[next] = true
            dfs(next, count + 1, cost + distance[node][next])
            visit[next] = false
        }
    }
}

visit[start] = true
dfs(start, 1, 0)

console.log(answer)