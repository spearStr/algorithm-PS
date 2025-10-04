function solution(n, wires) {
    let answer = Infinity
    
    const graph = Array(n + 1).fill(null).map(() => Array(0).fill())
    for (const [start, end] of wires) {
        graph[start].push(end)
        graph[end].push(start)
    }
    
    for (const target of wires) {
        const connect = []
        const visit = Array(n + 1).fill(false)
        for (let i = 1; i <= n; i++) {
            if (!visit[i]) {
                connect.push(dfs(i, target, visit))
            }
        }
        const diff = Math.abs(connect[0] - connect[1])
        answer = Math.min(answer, diff)
    }
    
    function dfs(node, target, visit) {
        visit[node] = true
        
        let count = 1
        for (const next of graph[node]) {
            if ((node === target[0] || node === target[1]) && (next === target[0] || next === target[1])) continue
            if (!visit[next]) {
                count += dfs(next, target, visit)
            }
        }

        return count
    }
    
    return answer
}