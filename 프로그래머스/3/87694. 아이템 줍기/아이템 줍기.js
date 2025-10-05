function solution(rectangle, characterX, characterY, itemX, itemY) {
    const board = Array(102).fill(null).map(() => Array(102).fill(false))
    const visit = Array(102).fill(null).map(() => Array(102).fill(false))

    for (const [x1, y1, x2, y2] of rectangle) {
        const X1 = x1 * 2, Y1 = y1 * 2, X2 = x2 * 2, Y2 = y2 * 2

        for (let i = X1; i <= X2; i++) {
            board[i][Y1] = true
            board[i][Y2] = true
        }
        for (let j = Y1; j <= Y2; j++) {
            board[X1][j] = true
            board[X2][j] = true
        }
    }

    for (const [x1, y1, x2, y2] of rectangle) {
        const X1 = x1 * 2, Y1 = y1 * 2, X2 = x2 * 2, Y2 = y2 * 2
        for (let i = X1 + 1; i < X2; i++) {
            for (let j = Y1 + 1; j < Y2; j++) {
                board[i][j] = false
            }
        }
    }

    const direction = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    const queue = [[characterX * 2, characterY * 2, 0]]
    visit[characterX * 2][characterY * 2] = true

    while (queue.length > 0) {
        const [x, y, count] = queue.shift()

        if (x === itemX * 2 && y === itemY * 2) {
            return count / 2
        }

        for (const [dx, dy] of direction) {
            const newX = x + dx
            const newY = y + dy

            if (
                0 <= newX && newX < 102 &&
                0 <= newY && newY < 102 &&
                board[newX][newY] &&
                !visit[newX][newY]
            ) {
                visit[newX][newY] = true
                queue.push([newX, newY, count + 1])
            }
        }
    }
}
