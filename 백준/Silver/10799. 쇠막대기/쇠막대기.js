const fs = require('fs')
const input = fs.readFileSync('dev/stdin').toString().trim()

const stack = []
let divideSign = true;
let answer = 0;

for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
        stack.push(input[i])
        divideSign = true;
    }

    else if (input[i] === ')') {
        stack.pop()
        answer += divideSign ? stack.length : 1
        divideSign = false
    }
}

console.log(answer)