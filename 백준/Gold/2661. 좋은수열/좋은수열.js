const fs = require('fs')
const input = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim()

const n = Number(input)

function solution(n) {
    let temp = Array(n).fill(0)

    function dfs(L) {
        if (L === n) {
            console.log(temp.join(''))
            process.exit()
        } else {
            for (let i = 1; i <= 3; i++) {
                temp[L] = i
                if (check(temp, L + 1)) {
                    dfs(L + 1)
                }
            }
        }
    }

    dfs(0)
    
    function check(sequence, length) {
        for (let i = 1; i <= Math.floor(length / 2); i++) {
            const sub1 = sequence.slice(length - i * 2, length - i).join('')
            const sub2 = sequence.slice(length - i, length).join('')
            if (sub1 === sub2) {
                return false
            }
        }
        return true
    }
}

solution(n)