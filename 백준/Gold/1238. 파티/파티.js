const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m, target] = firstLine.split(' ').map(Number)
const infos = input.map((line) => line.split(' ').map(Number))
const distance = Array(n + 1).fill(null).map(() => Array(0).fill(null))
const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
for (const info of infos) {
    const [start, end, cost] = info

    graph[start].push([end, cost])
}

class minHeap {
    constructor() {
        this.heap = []
    }

    heappush(value) {
        this.heap.push(value)
        let index = this.heap.length - 1

        while (index > 0) {
            let parentIdx = Math.floor((index - 1) / 2)

            if (this.heap[parentIdx][0] >= value[0]) break;

            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]]
            index = parentIdx
        }
    }

    heappop() {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()
        
        const minValue = this.heap[0]
        this.heap[0] = this.heap.pop()

        const len = this.heap.length
        let index = 0

        while (true) {
            const leftIdx = 2 * index + 1
            const rightIdx = 2 * index + 2
            let smallerIdx = index

            if (leftIdx < len && this.heap[leftIdx][0] < this.heap[smallerIdx][0]) {
                smallerIdx = leftIdx
            }

            if (rightIdx < len && this.heap[rightIdx][0] < this.heap[smallerIdx][0]) {
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

function dijkstra(start) {
    const dist = Array(n + 1).fill(Infinity)
    dist[start] = 0

    const heap = new minHeap()
    heap.heappush([0, start])

    while (heap.size() > 0) {
        const [currDist, currNode] = heap.heappop()

        for (const [nextNode, nextDist] of graph[currNode]) {
            if (currDist + nextDist < dist[nextNode]) {
                dist[nextNode] = currDist + nextDist
                heap.heappush([currDist + nextDist, nextNode])
            }
        }
    }

    return dist
}

for (let i = 1; i <= n; i++) {
    distance[i] = dijkstra(i)
}

const answer = []
for (let i = 1; i <= n; i++) {
    answer.push(distance[i][target] + distance[target][i])
}

console.log(Math.max(...answer))