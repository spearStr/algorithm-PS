const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)
const info = input.map((line) => line.split(' ').map(Number))

let answer = Infinity

for (let mask = 1; mask < (1 << n); mask++) {
    const teamA = []
    const teamB = []

    for (let i = 0; i < n; i++) {
        if (mask & 1 << i) {
            teamA.push(i)
        } else {
            teamB.push(i)
        }
    }

    let teamAscore = 0
    let teamBscore = 0
    if (teamA.length === 0 || teamB.length === 0) continue

    for (let i = 0; i < teamA.length; i++) {
        for (let j = 0; j < teamA.length; j++) {
            teamAscore += info[teamA[i]][teamA[j]]
        }
    }

    for (let i = 0; i < teamB.length; i++) {
        for (let j = 0; j < teamB.length; j++) {
            teamBscore += info[teamB[i]][teamB[j]]
        }
    }

    answer = Math.min(answer, Math.abs(teamAscore - teamBscore))
}

console.log(answer)