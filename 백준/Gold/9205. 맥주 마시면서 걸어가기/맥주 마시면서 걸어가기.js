const fs = require('fs')
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const t = Number(input[0])

let index = 1;
for (let i = 0; i < t; i++) {
    const n = Number(input[index++])
    const home = input[index++].split(' ').map(Number)
    const convenience = []
    for (let j = 0; j < n; j++) {
        convenience.push(input[index++].split(' ').map(Number))
    }
    const destination = input[index++].split(' ').map(Number)

    function isNearby(placeA, placeB) {
        return Math.abs(placeA[0] - placeB[0]) + Math.abs(placeA[1] - placeB[1]) <= 1000
    }

    let happySign = false;
    function dfs(place) {
        const stack = [place]

        while (stack.length > 0) {
            const place = stack.pop()
            if (isNearby(place, destination)) {
                happySign = true;
                break;
            }
            for (let j = 0; j < n; j++) {
                if (!visit[convenience[j]] && isNearby(place, convenience[j])) {
                    stack.push(convenience[j])
                    visit[convenience[j]] = true
                }
            }
        }
    }

    const visit = Array(n).fill(false);

    if (isNearby(home, destination)) {
        happySign = true
    }

    for (let j = 0; j < n; j++) {
        if (!happySign && isNearby(home, convenience[j]) && !visit[j]) {
            dfs(convenience[j])
        }
    }

    console.log(happySign ? "happy" : "sad")
}