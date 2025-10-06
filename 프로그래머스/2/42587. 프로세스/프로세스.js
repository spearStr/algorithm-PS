function solution(priorities, location) {
    let answer = 0

    let flag = true
    let count = 1
    while (flag) {
        const maxValue = Math.max(...priorities)
        const value = priorities.shift()
        
        if (maxValue !== value) {
            priorities.push(value)
        } else {
            if (location === 0) {
                return count
            }
            count += 1
        }
        
        if (location === 0) location = priorities.length - 1
        else location = (location - 1) % priorities.length
    }
}