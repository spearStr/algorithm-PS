const fs = require('fs')
const [first, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = first.split(' ').map(Number)

const info = []
let line = 0
for (let i = 0; i < m; i++) {
    info.push(input[line++].split(' ').map(Number))
}

const k = Number(input[line++])
const cities = input[line].split(' ').map(Number)

const graph = Array(n + 1).fill(null).map(() => Array(n + 1).fill(Infinity))
for (let i = 0; i < m; i++) {
    const [start, end, cost] = info[i]
    
    graph[start][end] = cost
}

function floydWarshall() {
    for (let i = 1; i <= n; i++) {
        graph[i][i] = 0
    }

    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (graph[i][j] > graph[i][k] + graph[k][j]) {
                    graph[i][j] = graph[i][k] + graph[k][j]
                }
            }
        }
    }

}

floydWarshall()

const answer = Array(n + 1).fill(0)
for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
        if (cities.includes(j) && i !== j) {
            answer[i] = Math.max(answer[i], graph[i][j] + graph[j][i])
        }
    }
}

const minValue = Math.min(...answer.slice(1))
const result = []
for (let i = 1; i <= n; i++) {
    if (answer[i] === minValue) result.push(i)
}

console.log(result.join(' '))