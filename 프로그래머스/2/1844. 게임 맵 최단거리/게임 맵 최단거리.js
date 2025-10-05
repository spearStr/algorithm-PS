function solution(maps) {
    let answer = Infinity
    
    const n = maps.length
    const m = maps[0].length
    const direction = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    const visit = Array(n).fill(null).map(() => Array(m).fill(false))
    
    const queue = [[0, 0, 1]]
    visit[0][0] = true
    
    while (queue.length > 0) {
        const [x, y, count] = queue.shift()
        
        if (x === n - 1 && y === m - 1) {
            return count
        }
        
        for (const [dx, dy] of direction) {
            const newX = x + dx
            const newY = y + dy
            
            if (0 <= newX && newX < n && 0 <= newY && newY < m && maps[newX][newY] === 1 && !visit[newX][newY]) {
                queue.push([newX, newY, count + 1])
                visit[newX][newY] = true
            }
        }
    }
    
    return -1
    
}