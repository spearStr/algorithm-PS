function solution(n, computers) {
    let answer = 0;
    
    const graph = Array(n).fill(null).map(() => Array(0).fill())
    const visit = Array(n).fill(false)
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j && computers[i][j] === 1) graph[i].push(j)
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (!visit[i]) {
            bfs(i)
            answer += 1
        }
    }
    
    function bfs(node) {
        visit[node] = true
        
        const queue = graph[node]

        while (queue.length > 0) {
            const currentNode = queue.shift()
            if (visit[currentNode]) continue
            
            visit[currentNode] = true
            for (let i = 0; i < graph[currentNode].length; i++) {
                if (!visit[graph[currentNode][i]]) queue.push(graph[currentNode][i])
            }
        }
    }
    
    return answer
}