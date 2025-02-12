const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m, k] = firstLine.split(' ').map(Number)

let line = 0
const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))

for (let i = 0; i < m; i++) {
    const [start, end, cost] = input[line++].split(' ').map(Number);
    
    graph[end].push([start, cost]);
}

const distance = Array(n + 1).fill(Infinity)
const targetCity = input[line].split(' ').map(Number)

class minHeap {
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
            index = smallerIdx
        }

        return minValue
    }

    size() {
        return this.heap.length
    }
}

function dijkstra() {
    const heapq = new minHeap();

    for (const city of targetCity) {
        distance[city] = 0;
        heapq.heappush([0, city]);
    }

    while (heapq.size() > 0) {
        const [currDist, currNode] = heapq.heappop();

        if (currDist > distance[currNode]) continue;

        for (const [nextNode, nextDist] of graph[currNode]) {
            if (currDist + nextDist < distance[nextNode]) {
                distance[nextNode] = currDist + nextDist;
                heapq.heappush([distance[nextNode], nextNode]);
            }
        }
    }
}

dijkstra();

let answerCity = -1;
let answerDist = -1;

for (let i = 1; i <= n; i++) {
    if (distance[i] !== Infinity && distance[i] > answerDist) {
        answerDist = distance[i];
        answerCity = i;
    }
}

console.log(answerCity);
console.log(answerDist);