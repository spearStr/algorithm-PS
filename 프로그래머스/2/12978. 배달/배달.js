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
            
            if (leftIdx < len && this.heap[leftIdx][0] < this.heap[smallerIdx][0]) smallerIdx = leftIdx
            if (rightIdx < len && this.heap[rightIdx][0] < this.heap[smallerIdx][0]) smallerIdx = rightIdx
            
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

function solution(N, road, K) {
    let answer = 0
    
    const graph = Array(N + 1).fill(null).map(() => Array(0).fill(null))
    for (const [start, end, cost] of road) {
        graph[start].push([end, cost])
        graph[end].push([start, cost])
    }
    
    function dijkstra(start) {
        const dist = Array(N + 1).fill(Infinity)
        
        dist[start] = 0
        
        const heapq = new MinHeap()
        heapq.heappush([0, start])
        
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
    
    const result = dijkstra(1)
    
    for (const cost of result) {
        if (cost <= K) answer += 1
    }
    
    return answer
}