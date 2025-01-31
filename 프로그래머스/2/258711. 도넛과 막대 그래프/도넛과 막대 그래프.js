function findRoot(graph) {
    for (const key in graph) {
        if (graph[key][0] >= 2 && graph[key][1] === 0) {
            return Number(key)
        }
    }
}

function solution(edges) {
    const answer = Array(4).fill(0)
    const graph = {}
    
    for (const [start, end] of edges) {
        if (!graph[start]) {
            graph[start] = [0, 0]
        }
        
        if (!graph[end]) {
            graph[end] = [0, 0]
        }
        graph[start][0] += 1
        graph[end][1] += 1
    }
    
    const root = findRoot(graph)
    answer[0] = root
    
    let rootGive = graph[root][0]
    for (const [start, end] of edges) {
        if (start !== root) continue
        graph[end][1] -= 1
    }
    
    for (const key in graph) {
        if (graph[key][0] === 0 && graph[key][1] >= 0) {
            answer[2] += 1
        } else if (graph[key][0] === 2 && graph[key][1] === 2) {
            answer[3] += 1
        }
    }
    
    answer[1] = rootGive - (answer[2] + answer[3])
    
    return answer
}