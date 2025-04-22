const fs = require('fs');
const [input, first] = fs.readFileSync(fs.existsSync('dev/stdin') ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')

const [n, w, L] = input.split(' ').map(Number)
const trucks = first.split(' ').map(Number)

let time = 0
let bridge = Array(w).fill(0)
let bridgeWeight = 0
let idx = 0

while (idx < n) {
    time += 1

    bridgeWeight -= bridge.shift()

    if (bridgeWeight + trucks[idx] <= L) {
        bridge.push(trucks[idx])
        bridgeWeight += trucks[idx]
        idx += 1
    } else {
        bridge.push(0)
    }
}

time += w

console.log(time)
