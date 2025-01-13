function solution(dirs) {
    const visitSet = new Set();
    const direction = {'L' : [-1, 0], 'R': [1, 0], 'U': [0, 1], 'D': [0, -1]}
    
    let x = 0;
    let y = 0;
    let answer = 0;
    for (const letter of dirs) {
        const newX = x + direction[letter][0]
        const newY = y + direction[letter][1]
        if (-5 <= newX && newX <= 5 && -5 <= newY && newY <= 5) {
            const current = `${x}, ${y}, ${newX}, ${newY}`;
            const reverse = `${newX}, ${newY}, ${x}, ${y}`;
            if (!visitSet.has(current) && !visitSet.has(reverse)) {
                visitSet.add(current);
                visitSet.add(reverse);
                answer += 1;
            }
            
            x = newX
            y = newY
        }
    }
    
    return answer;
}