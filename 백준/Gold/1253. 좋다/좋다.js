const fs = require('fs')
const [firstLine, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)
const numbers = input.split(' ').map(Number)
numbers.sort((a, b) => a - b)

let count = 0

for (let k = 0; k < n; k++) {
    let target = numbers[k]
    let left = 0
    let right = n - 1

    while (left < right) {
        if (left === k) {
            left += 1
            continue
        }
        if (right === k) {
            right -= 1
            continue
        }

        let sum = numbers[left] + numbers[right]
        if (sum === target) {
            count += 1
            break
        }

        if (sum < target) left += 1
        else right -= 1
    }
}

console.log(count)