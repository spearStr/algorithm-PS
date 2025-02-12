const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)

let line = 0;
const infos = []
for (let i = 0; i < m; i++) {
    infos.push(input[line++].split(' ').map(Number))
}

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
for (const info of infos) {
    const [start, end, cost] = info

    graph[start].push([end, cost])
    graph[end].push([start, cost])
}

const [v1, v2] = input[line].split(' ').map(Number)

class minHeap {
    constructor() {
        this.heap = []
    }

    heappush(value) {
        this.heap.push(value)
        let index = this.heap.length - 1

        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2)

            if (this.heap[parentIdx][0] <= this.heap[index][0]) break;

            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]]
            index = parentIdx
        }
    }

    heappop() {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()

        const minValue = this.heap[0]
        this.heap[0] = this.heap.pop()

        let index = 0;
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
        }

        return minValue
    }

    size()  {
        return this.heap.length
    }
}

function dijkstra(node) {
    const dist = Array(n + 1).fill(Infinity)
    dist[node] = 0

    const heapq = new minHeap()
    heapq.heappush([0, node])

    while (heapq.size() > 0) {
        const [currDist, currNode] = heapq.heappop()

        for (const [nextNode, nextDist] of graph[currNode]) {
            if (currDist + nextDist < dist[nextNode]) {
                dist[nextNode] = currDist + nextDist
                heapq.heappush([currDist + nextDist, nextNode])
            }
        }
    }

    return dist
}

const oneDistance = dijkstra(1);
const v1Distance = dijkstra(v1);
const v2Distance = dijkstra(v2);

const path1 = oneDistance[v1] + v1Distance[v2] + v2Distance[n];
const path2 = oneDistance[v2] + v2Distance[v1] + v1Distance[n];

const result = Math.min(path1, path2);
console.log(result === Infinity ? -1 : result);