const fs = require('fs')
const [i1, i2, i3, i4] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const n = Number(i1)
const limits = i2.split(' ').map(Number)
const m = Number(i3)
const boxes = i4.split(' ').map(Number)

limits.sort((a, b) => b - a)
boxes.sort((a, b) => b - a)

function solution() {
    if (limits[0] < boxes[0]) {
        console.log(-1)
        return
    }
    
    let answer = 0
    let visit = Array(m).fill(false)
    let moved = 0
    
    while (moved < m) {
        let idx = 0
    
        for (let i = 0; i < n; i++) {
            while (idx < m) {
                if (!visit[idx] && limits[i] >= boxes[idx]) {
                    visit[idx] = true
                    moved += 1
                    idx += 1
                    break
                }
                idx += 1
            }
        }
    
        answer += 1
    }
    
    console.log(answer)
}

solution()