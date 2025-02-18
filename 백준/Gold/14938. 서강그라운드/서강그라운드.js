const fs = require('fs')
const [first, second, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, limit, road] = first.split(' ').map(Number)
const items = second.split(' ').map(Number)
const info = input.map((line) => line.split(' ').map(Number))
const graph = Array(n + 1).fill(null).map(() => Array(n + 1).fill(null).map(() => [Infinity, 0]))

for (let i = 0; i < road; i++) {
    const [start, end, cost] = info[i]
    graph[start][end][0] = cost
    graph[end][start][0] = cost
}

function floydWarshall() {

    for (let i = 1; i <= n; i++) {
        graph[i][i][1] = items[i - 1]
        graph[i][i][0] = 0
    }



    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (graph[i][k][0] + graph[k][j][0] <= limit && graph[i][k][0] + graph[k][j][0] < graph[i][j][0]) {
                    graph[i][j][0] = graph[i][k][0] + graph[k][j][0]
                    graph[i][j][1] = graph[i][k][1] + graph[k][j][1]
                }
            }
        }
    }

}

floydWarshall()

let answer = 0
for (let i = 1; i <= n; i++) {
    let temp = 0
    for (let j = 1; j <= n; j++) {
        if (graph[i][j][0] <= limit) {
            temp += items[j - 1]
        }
    }
    answer = Math.max(answer, temp)
}

console.log(answer)