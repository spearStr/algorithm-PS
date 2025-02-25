function solution(points, routes) {
    let answer = 0
    
    const position = new Map()
    for (let i = 1; i < points.length + 1; i++) {
        position.set(i, points[i - 1])
    }
    
    const robots = new Map()
    let robotQueue = []
    let board = Array(101).fill(null).map(() => Array(101).fill(0))
    
    for (let i = 1; i <= routes.length; i++) {
        const route = routes[i - 1].map(r => [...position.get(r)]);
        robots.set(i, { path: route, index: 0 });
        let start = route[0];
        board[start[0]][start[1]] += 1;
        robotQueue.push(i);
    }

    answer += checkCollision(board)
    
    let finish = 0
    while (finish < routes.length) {
        let board = Array(101).fill(null).map(() => Array(101).fill(0))
        let tmpQueue = []
        while (robotQueue.length > 0) {
            const robot = robotQueue.shift()

            let { path, index } = robots.get(robot);
            
            if (index >= path.length - 1) {
                finish += 1;
                continue;
            }

            let current = path[index];
            let next = path[index + 1];

            if (next[0] !== current[0]) {
                current[0] += next[0] > current[0] ? 1 : -1;
            } else if (next[1] !== current[1]) {
                current[1] += next[1] > current[1] ? 1 : -1;
            }

            if (current[0] === next[0] && current[1] === next[1]) {
                index += 1;
            }
            
            board[current[0]][current[1]] += 1
            tmpQueue.push(robot)
            robots.set(robot, { path, index });
        }
        robotQueue = tmpQueue
        answer += checkCollision(board)
    }
    return answer
}

function checkCollision(board) {
    let count = 0
    for (let i = 1; i <= 100; i++) {
        for (let j = 1; j <= 100; j++) {
            if (board[i][j] >= 2) count += 1
        }
    }
    return count
}
