const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m, startNode, endNode, maxCost] = firstLine.split(' ').map(Number)
const graph = Array(n + 1).fill(null).map(() => Array(0).fill([]))
for (let i = 0; i < m; i++) {
    const [start, end, cost] = input[i].split(' ').map(Number)

    graph[start].push([end, cost])
    graph[end].push([start, cost])
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

function canReach(limit) {
    const distance = Array(n + 1).fill(Infinity);
    distance[startNode] = 0;

    const heapq = new MinHeap();
    heapq.heappush([0, startNode]);

    while (heapq.size() > 0) {
        const [currCost, currNode] = heapq.heappop();

        if (distance[currNode] < currCost) continue;

        for (const [nextNode, nextCost] of graph[currNode]) {
            if (nextCost > limit) continue;

            const newCost = currCost + nextCost;

            if (newCost > maxCost) continue;

            if (newCost < distance[nextNode]) {
                distance[nextNode] = newCost;
                heapq.heappush([newCost, nextNode]);
            }
        }
    }

    return distance[endNode] !== Infinity;
}

function binarySearch() {
    let left = 0;
    let right = Math.max(...graph.flat().map(x => x[1]));
    let answer = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (canReach(mid)) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return answer;
}

console.log(binarySearch());