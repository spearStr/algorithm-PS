function solution(board) {
    
    const n = board.length
    const m = board[0].length
    
    const visit = Array(n).fill(null).map(() => Array(m).fill(false))
    const answer = Array(n).fill(null).map(() => Array(m).fill(Infinity))
    
    const queue = []
    let end = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'R') {
                board[i][j] = '.'
                queue.push([i, j, 0])
                answer[i][j] = 0
            } else if (board[i][j] === 'G') {
                end = [i, j]
            }
        }
    }

    while (queue.length > 0) {
        const [x, y, count] = queue.shift()
        
        if (!visit[x][y]) {
            visit[x][y] = true

            let xUp = x
            while (true) {
                if (xUp - 1 >= 0 && board[xUp - 1][y] !== 'D') {
                    xUp -= 1
                } else {
                    break
                }
            }
            answer[xUp][y] = Math.min(count + 1, answer[xUp][y])
            if (!visit[xUp][y]) queue.push([xUp, y, count + 1])
            
            let xDown = x
            while (true) {
                if (xDown + 1 < n && board[xDown + 1][y] !== 'D') {
                    xDown += 1
                } else {
                    break
                }
            }
            answer[xDown][y] = Math.min(count + 1, answer[xDown][y])
            if (!visit[xDown][y]) queue.push([xDown, y, count + 1])
            
            let yLeft = y
            while (true) {
                if (yLeft - 1 >= 0 && board[x][yLeft - 1] !== 'D') {
                    yLeft -= 1
                } else {
                    break
                }
            }
            answer[x][yLeft] = Math.min(count + 1, answer[x][yLeft])
            if (!visit[x][yLeft]) queue.push([x, yLeft, count + 1])
            
            let yRight = y
            while (true) {
                if (yRight + 1 < m && board[x][yRight + 1] !== 'D') {
                    yRight += 1
                } else {
                    break
                }
            }
            answer[x][yRight] = Math.min(count + 1, answer[x][yRight])
            if (!visit[x][yRight]) queue.push([x, yRight, count + 1])
        }
    }

    return answer[end[0]][end[1]] === Infinity ? -1 : answer[end[0]][end[1]]
}