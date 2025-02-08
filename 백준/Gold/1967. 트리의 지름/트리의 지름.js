const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]));

for (let i = 1; i < input.length; i++) {
    const [parent, child, weight] = input[i].split(' ').map(Number);
    graph[parent].push([child, weight]);
    graph[child].push([parent, weight]);
}

function bfs(start) {
    const dist = Array(n + 1).fill(-1);
    const queue = [[start, 0]];
    dist[start] = 0;

    let farthestNode = start;
    let maxDistance = 0;

    while (queue.length) {
        const [node, distance] = queue.shift();

        for (const [next, weight] of graph[node]) {
            if (dist[next] === -1) {
                dist[next] = distance + weight;
                queue.push([next, dist[next]]);

                if (dist[next] > maxDistance) {
                    maxDistance = dist[next];
                    farthestNode = next;
                }
            }
        }
    }

    return [farthestNode, maxDistance];
}

const [farthestFromRoot, _] = bfs(1);
const [__, answer] = bfs(farthestFromRoot);

console.log(answer);
