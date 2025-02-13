class MinHeap {
    constructor() {
        this.heap = []
    }

    heappush(value) {
        this.heap.push(value)
        let index = this.heap.length - 1

        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2)

            if (this.heap[parentIdx][0] <= this.heap[index][0]) break

            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]]
            index = parentIdx
        }
    }

    heappop() {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()

        const minValue = this.heap[0]
        this.heap[0] = this.heap.pop()

        let index = 0
        const len = this.heap.length

        while (true) {
            const leftIdx = 2 * index + 1
            const rightIdx = 2 * index + 2
            let smallerIdx = index

            if (leftIdx < len && this.heap[smallerIdx][0] > this.heap[leftIdx][0]) {
                smallerIdx = leftIdx
            }

            if (rightIdx < len && this.heap[smallerIdx][0] > this.heap[rightIdx][0]) {
                smallerIdx = rightIdx
            }

            if (smallerIdx === index) break

            [this.heap[smallerIdx], this.heap[index]] = [this.heap[index], this.heap[smallerIdx]]
            index = smallerIdx
        }

        return minValue
    }

    size() {
        return this.heap.length
    }
}

const fs = require('fs')
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n')

let line = 0;
while (true) {
    const [n, m] = input[line++].split(' ').map(Number)

    if (n === 0 && m === 0) break

    const [startNode, endNode] = input[line++].split(' ').map(Number)
    let graph = Array(n).fill(null).map(() => Array(0).fill([]))
    let reverseGraph = Array(n).fill(null).map(() => Array(0).fill([]))
    for (let i = 0; i < m; i++) {
        const [start, end, cost] = input[line++].split(' ').map(Number)

        graph[start].push([end, cost])
        reverseGraph[end].push([start, cost])
    }

    function dijkstra(start, ignoreEdges) {
        const distance = Array(n).fill(Infinity);
        distance[start] = 0;

        let heapq = new MinHeap();
        heapq.heappush([0, start]);

        while (heapq.size() > 0) {
            const [currDist, currNode] = heapq.heappop();
            if (currDist > distance[currNode]) continue;

            for (const [nextNode, weight] of graph[currNode]) {
                if (ignoreEdges.has(`${currNode}-${nextNode}`)) continue;

                const newDist = currDist + weight;
                if (newDist < distance[nextNode]) {
                    distance[nextNode] = newDist;
                    heapq.heappush([newDist, nextNode]);
                }
            }
        }
        return distance;
    }

    function findShortestEdges(dist) {
        let queue = [endNode];
        let shortestEdges = new Set();
        let visited = new Set();

        while (queue.length > 0) {
            let currNode = queue.shift();
            if (visited.has(currNode)) continue;
            visited.add(currNode);

            for (let [prevNode, weight] of reverseGraph[currNode]) {
                if (dist[prevNode] + weight === dist[currNode]) {
                    shortestEdges.add(`${prevNode}-${currNode}`);
                    queue.push(prevNode);
                }
            }
        }
        return shortestEdges;
    }
    
    let dist = dijkstra(startNode, new Set());
    let shortestEdges = findShortestEdges(dist);
    let secondDist = dijkstra(startNode, shortestEdges);

    console.log(secondDist[endNode] === Infinity ? -1 : secondDist[endNode]);
}