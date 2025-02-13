const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
const inDegree = Array(n + 1).fill(0)
for (let i = 0; i < m; i++) {
    const [start, end] = input[i].split(' ').map(Number)
    
    graph[start].push(end)
    inDegree[end] += 1
}

class minHeap {
    constructor() {
        this.heap = []
    }

    heappush(value) {
        this.heap.push(value)
        let index = this.heap.length - 1

        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2)

            if (this.heap[parentIdx] <= this.heap[index]) break

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

            if (leftIdx < len && this.heap[smallerIdx] > this.heap[leftIdx]) {
                smallerIdx = leftIdx
            }

            if (rightIdx < len && this.heap[smallerIdx] > this.heap[rightIdx]) {
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

const heapq = new minHeap()

for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
        heapq.heappush(i);
    }
}

const answer = [];
while (heapq.size() > 0) {
    const curr = heapq.heappop();
    answer.push(curr);

    for (const next of graph[curr]) {
        inDegree[next] -= 1
        if (inDegree[next] === 0) {
            heapq.heappush(next);
        }
    }
}

console.log(answer.join(' '));