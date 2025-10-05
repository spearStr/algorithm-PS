function solution(n, edge) {
    let answer = 0
    
    const graph = Array(n + 1).fill(null).map(() => Array(0).fill())
    const visit = Array(n + 1).fill(false)
    
    for (const [start, end] of edge) {
        graph[start].push(end)
        graph[end].push(start)
    }

    function dijkstra(node) {
        const dist = Array(n + 1).fill(Infinity)
        
        const queue = [node]
        visit[node] = true
        dist[node] = 0
        
        while (queue.length > 0) {
            const curr = queue.shift()
            
            const next = graph[curr]

            for (let i = 0; i < next.length; i++) {
                if (!visit[next[i]]) {
                    visit[next[i]] = true
                    if (dist[curr] + 1 < dist[next[i]]) {
                        dist[next[i]] = dist[curr] + 1
                        queue.push(next[i])
                    }
                }
            }
        }
        
        return dist
    }
    
    const dist = dijkstra(1)
    const maxValue = Math.max(...dist.slice(1))
    for (let i = 0; i < dist.length; i++) {
        if (maxValue === dist[i]) answer += 1
    }
    
    return answer
}