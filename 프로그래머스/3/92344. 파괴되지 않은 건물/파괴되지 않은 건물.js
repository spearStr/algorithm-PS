function solution(board, skill) {
    const n = board.length
    const m = board[0].length
    
    const diff = Array(n).fill(null).map(() => Array(m).fill(0))
    
    for (const [type, r1, c1, r2, c2, degree] of skill) {
        const value = type === 1 ? -degree : degree
        
        diff[r1][c1] += value
        if (c2 + 1 < m) diff[r1][c2 + 1] -= value
        if (r2 + 1 < n) diff[r2 + 1][c1] -= value
        if (c2 + 1 < m && r2 + 1 < n) diff[r2 + 1][c2 + 1] += value
    }
    
    for (let row = 0; row < n; row++) {
        for (let col = 1; col < m; col++) {
            diff[row][col] += diff[row][col - 1];
        }
    }
    
    for (let col = 0; col < m; col++) {
        for (let row = 1; row < n; row++) {
            diff[row][col] += diff[row - 1][col];
        }
    }
    
    let answer = 0;
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < m; col++) {
            if (board[row][col] + diff[row][col] > 0) answer += 1
        }
    }
    
    return answer
}