const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [m, n] = firstLine.split(' ').map(Number)
const board = input.map((line) => line.split('').map(Number))

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

const distance = Array(n + 1).fill(null).map(() => Array(m + 1).fill(Infinity))
const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]]

function dijkstra(i, j) {
    distance[i][j] = 0

    const heapq = new minHeap()
    heapq.heappush([0, i, j])

    while (heapq.size() > 0) {
        [currDist, currX, currY] = heapq.heappop()

        for (const [dx, dy] of directions) {
            const newX = dx + currX
            const newY = dy + currY
            if (1 <= newX && newX <= n && 1 <= newY && newY <= m && currDist + board[currX - 1][currY - 1] < distance[newX][newY]) {
                distance[newX][newY] = currDist + board[currX - 1][currY - 1]
                heapq.heappush([currDist + board[currX - 1][currY - 1], newX, newY])
            }
        }
    }
}

dijkstra(1, 1)
console.log(distance[n][m])