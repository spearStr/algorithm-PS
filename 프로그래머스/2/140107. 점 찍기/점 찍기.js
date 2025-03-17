function solution(k, d) {
    let answer = 0
    const targets = []
    for (let i = 0; i <= d; i++) {
        const target = Math.floor(Math.sqrt(d ** 2 - (i * k) ** 2))
        if (isNaN(target)) break
        targets.push(target)
        answer += Math.floor(target / k) + 1
    }
    
    return answer
}