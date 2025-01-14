const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const n = Number(firstLine)

function bfs(startKey) {
    const visit = new Set();
    const queue = [[startKey, 0]];
    let point = 0

    while (queue.length > 0) {
        const [key, depth] = queue.shift()
        if (visit.has(key)) continue;

        visit.add(key);
        point = Math.max(point, depth)
        for (const node of friendList[key]){
            if (!visit.has(node)) {
                queue.push([node, depth + 1]);
            }
        }
    }
    answer[startKey] = point

}

const friendList = {}
for (const line of input) {
    const [person1, person2] = line.split(' ').map(Number);

    if (person1 === -1 && person2 === -1) break;

    if (!friendList[person1]) friendList[person1] = [];
    if (!friendList[person2]) friendList[person2] = [];

    friendList[person1].push(person2);
    friendList[person2].push(person1);
}

const answer = {}
for (const key of Object.keys(friendList)) {
    bfs(Number(key));
}

const minPoint = Math.min(...Object.values(answer));

const candidators = Object.entries(answer)
    .filter(([_, value]) => value === minPoint)
    .map(([key]) => Number(key));

console.log(minPoint, candidators.length)
console.log(candidators.join(' '));