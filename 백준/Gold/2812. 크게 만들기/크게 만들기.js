const fs = require('fs')
const [first, input] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

let [n, k] = first.split(' ').map(Number)
const stack = input.split('').map(Number).reverse()
const answer = []

const standard = n - k

while (k > 0 && answer.length < standard) {
    let maxNum = 0
    let maxIdx = 0
    let length = stack.length
    for (let i = 0; i <= k; i++) {
        if (maxNum < stack[length - i - 1]) {
            maxNum = stack[length - i - 1]
            maxIdx = i
        }       
    }

    for (let i = 0; i < maxIdx; i++) stack.pop()
    answer.push(stack.pop())

    k -= maxIdx
}

if (answer.length !== standard) {
    answer.push(...stack.reverse())
}

console.log(answer.join(''))
