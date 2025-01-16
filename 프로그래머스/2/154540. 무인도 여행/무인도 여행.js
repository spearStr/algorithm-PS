const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function dfs(islandMap, visit, x, y) {
    const stack = [[x, y]]
    let survive = islandMap[x][y];
    visit[x][y] = true
    
    while (stack.length > 0) {
        const [x, y] = stack.pop()
        
        for (const [dx, dy] of direction) {
            const newX = x + dx
            const newY = y + dy
            if (0 <= newX && newX < islandMap.length && 0 <= newY && newY < islandMap[0].length && !visit[newX][newY] && islandMap[newX][newY] !== 'X') {
                survive += islandMap[newX][newY]
                visit[newX][newY] = true
                stack.push([newX, newY])
            }
        }
    }
    
    return survive
}

function solution(maps) {
    const answer = []
    
    const x = maps.length
    const y = maps[0].length
    const islandMap = Array.from({ length: x }, () => Array(y).fill(null));
    const visit = Array(x).fill(null).map(() => Array(y).fill(false))
    for (let i = 0; i < maps.length; i++) {
        const line = maps[i].split('')
        for (let j = 0; j < maps[0].length; j++) {
            if (line[j] === 'X') islandMap[i][j] = line[j]
            else islandMap[i][j] = Number(line[j])
        }
    }
    
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (!visit[i][j] && islandMap[i][j] !== 'X') {
                answer.push(dfs(islandMap, visit, i, j))
            }
        }
    }
    
    return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b)
}