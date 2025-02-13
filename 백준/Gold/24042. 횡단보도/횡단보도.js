const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const orders = input.map((line) => line.split(' ').map(Number))

const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
for (let i = 0; i < m; i++) {
    const [start, end] = orders[i];
    graph[start].push([end, i]);
    graph[end].push([start, i]);
}
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

function dijkstra(start) {
    const distance = Array(n + 1).fill(Infinity);
    distance[start] = 0;
    
    const pq = new MinHeap();
    pq.heappush([0, start]);
    
    while (pq.size() > 0) {
        const [currTime, currNode] = pq.heappop();
        
        if (distance[currNode] < currTime) continue;
        
        for (const [nextNode, signalIdx] of graph[currNode]) {
            let nextTime = currTime;

            const cycle = Math.floor(currTime / m);
            const currentMod = currTime % m;
            
            if (currentMod <= signalIdx) {
                nextTime = cycle * m + signalIdx;
            } else {
                nextTime = (cycle + 1) * m + signalIdx;
            }
            
            nextTime += 1;
            
            if (nextTime < distance[nextNode]) {
                distance[nextNode] = nextTime;
                pq.heappush([nextTime, nextNode]);
            }
        }
    }
    
    return distance[n];
}

console.log(dijkstra(1));