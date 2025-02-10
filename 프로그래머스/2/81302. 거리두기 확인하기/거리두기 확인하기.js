function solution(places) {
    const answer = []
    
    const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    
    roop1: for (const place of places) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (place[i][j] === 'P') {
                    const result = bfs(i, j, place)
                    if (!result) {
                        answer.push(0)
                        continue roop1
                    }
                }
            }
        }
        answer.push(1)
    }
    
    function bfs(i, j, place) {
        const visit = Array(5).fill(null).map(() => Array(5).fill(false))
        const queue = [[i, j, 0]]
        
        visit[i][j] = true
        while (queue.length > 0) {
            const [x, y, cnt] = queue.shift()
            
            for (const direction of directions) {
                const [dx, dy] = direction
                const newX = x + dx
                const newY = y + dy
                if (0 <= newX && newX < 5 && 0 <= newY && newY < 5 && !visit[newX][newY] && place[newX][newY] !== 'X') {
                    if (place[newX][newY] === 'P' && cnt < 2) {
                        return false
                    }
                    if (cnt < 2) {
                        queue.push([newX, newY, cnt + 1])
                        visit[newX][newY] = true
                    }
                }
            }
        }
        return true
    }
    
    
    return answer
}