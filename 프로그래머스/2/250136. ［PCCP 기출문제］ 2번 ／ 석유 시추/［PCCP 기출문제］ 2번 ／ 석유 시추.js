function solution(land) {
    const n = land.length
    const m = land[0].length
    
    const direction = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    
    const visit = Array(n).fill(null).map(() => Array(m).fill(false))
    const oil = Array(m).fill(0)
    
    function bfs(row, col) {
        visit[row][col] = true
        
        const queue = [[row, col]]
        
        let count = 1
        let oilSet = new Set([col])
        
        while (queue.length > 0) {
            const [x, y] = queue.shift()
            
            for (const [dx, dy] of direction) {
                const newX = x + dx
                const newY = y + dy
                
                if (0 <= newX && newX < n && 0 <= newY && newY < m && !visit[newX][newY] && land[newX][newY] === 1) {
                    visit[newX][newY] = true
                    queue.push([newX, newY])
                    count += 1
                    oilSet.add(newY)
                }
            }
        }
        
        for (const col of oilSet) {
            oil[col] += count
        }
        
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visit[i][j] && land[i][j] === 1) bfs(i, j)
        }
    }
    
    return Math.max(...oil)
}
