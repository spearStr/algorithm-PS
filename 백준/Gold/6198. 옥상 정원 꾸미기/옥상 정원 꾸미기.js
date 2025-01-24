const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const N = Number(firstLine)
const building = input.map(Number)
const stack = []
let answer = 0

for (let i = 0; i < building.length; i++) {
    while (stack.length > 0 && stack[stack.length - 1] <= building[i]) {
        stack.pop()
    }

    answer += stack.length

    stack.push(building[i])
}

console.log(answer)