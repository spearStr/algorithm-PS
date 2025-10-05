function solution(citations) {
    let answer = 0

    for (let idx = 10000; idx >= 0; idx--) {
        let upIdx = 0
        let downIdx = 0
        
        for (let i = 0; i < citations.length; i++) {
            if (citations[i] >= idx) upIdx += 1
            if (citations[i] <= idx) downIdx += 1
        }
        
        if (upIdx >= idx && downIdx <= idx) return idx
    }

    return answer
}