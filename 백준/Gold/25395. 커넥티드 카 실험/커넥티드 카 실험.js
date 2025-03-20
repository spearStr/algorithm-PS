const fs = require('fs')
const [first, second, third] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const [n, s] = first.split(' ').map(Number)
const position = [-1, ...second.split(' ').map(Number)]
const energy = [-1, ...third.split(' ').map(Number)]

const visit = Array(n + 1).fill(false)
visit[s] = true
const queue = [s]

let left = position[s]
let right = position[s]

const answer = []

let leftStandard = s
let rightStandard = s

while (queue.length > 0) {
    const node = queue.shift()

    left = Math.min(left, position[node] - energy[node])
    right = Math.max(right, position[node] + energy[node])

    while (left <= position[leftStandard] && leftStandard > 0) {
        if (!visit[leftStandard]) {
            queue.push(leftStandard)
            visit[leftStandard] = true
        }

        leftStandard -= 1
    }

    while (right >= position[rightStandard]) {
        if (!visit[rightStandard]) {
            queue.push(rightStandard)
            visit[rightStandard] = true
        }

        rightStandard += 1
    }
}

for (let i = 0; i <= n; i++) {
    if (visit[i]) answer.push(i)
}

console.log(answer.join(' '))