const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, direction] = firstLine.split(' ').map(Number)
const strings = input.map((line) => line.trim())

const answer = []
for (const string of strings) {
    let changedWord = ''
    for (const char of string) {
        changedWord += change(char, direction)
    }

    answer.push(changedWord)
}

console.log(answer.join('\n'))

function change(char, direction) {
    if (char === 'b') {
        if (direction === 1) return 'p'
        return 'd'
    } else if (char === 'd') {
        if (direction === 1) return 'q'
        return 'b'
    } else if (char === 'p') {
        if (direction === 1) return 'b'
        return 'q'
    } else {
        if (direction === 1) return 'd'
        return 'p'
    }
}