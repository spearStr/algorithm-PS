function solution(progresses, speeds) {
    const answer = []
    
    const n = progresses.length
    const complete = Array(n).fill(false)
    const distribution = Array(n).fill(false)
    
    while (!checkAll(complete)) {
        for (let i = 0; i < n; i++) {
            if (!complete[i]) {
                progresses[i] = Math.min(progresses[i] + speeds[i], 100)
                if (progresses[i] === 100) complete[i] = true
            }
        }
        
        let flag = true
        let count = 0
        for (let i = 0; i < n; i++) {
            if (complete[i] === false) break
            if (distribution[i]) continue
            
            distribution[i] = true
            count += 1
        }
        
        if (count !== 0) answer.push(count)
    }
    
    return answer
}

function checkAll(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === false) return false
    }
    
    return true
}