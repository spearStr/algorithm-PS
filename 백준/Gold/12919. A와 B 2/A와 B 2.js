const fs = require('fs')
const [first, second] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const start = first.trim()
const end = second.trim()

const startLen = start.length
const ends = [end]

function check() {
    while (ends.length > 0) {
        let str = ends.pop()
        const n = str.length

        if (str.length < startLen) continue
        if (str === start) return true

        if (str[0] === 'A' && str[n - 1] === 'A') {
            ends.push(str.slice(0, n - 1))
        } else if (str[0] === 'A' && str[n - 1] === 'B') {
            continue
        } else if (str[0] === 'B' && str[n - 1] === 'A') {
            ends.push(str.slice(0, n - 1))
            ends.push(str.split("").reverse().join("").slice(0, n - 1))
        } else {
            ends.push(str.split("").reverse().join("").slice(0, n - 1))
        }
    }

    return false
}

console.log(check() ? 1 : 0)