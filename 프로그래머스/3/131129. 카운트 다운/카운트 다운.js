function solution(target) {
    const answer = []
    const possiblePoint = new Set()
    
    possiblePoint.add(50)
    for (let i = 1; i <= 20; i++) {
        possiblePoint.add(i)
        possiblePoint.add(i * 2)
        possiblePoint.add(i * 3)
    }

    let queue = [[target, 0, 0]]
    let visit = new Map()
    
    while (queue.length > 0) {
        let [newTarget, count, special] = queue.shift()
        
        if (newTarget === 0) {
            answer.push([count, special])
            continue
        }
        
        for (const point of possiblePoint) {
            const nextTarget = newTarget - point
            if (nextTarget < 0) continue
            
            const isSpecial = (point <= 20 || point === 50) ? 1 : 0
            const nextCount = count + 1
            const nextSpecial = special + isSpecial
            
             if (!visit.has(nextTarget) || 
                visit.get(nextTarget)[0] > nextCount || 
                (visit.get(nextTarget)[0] === nextCount && visit.get(nextTarget)[1] < nextSpecial)) {  
                visit.set(nextTarget, [nextCount, nextSpecial])
                queue.push([nextTarget, nextCount, nextSpecial])
            }
        }
    }
    
    return answer.sort((a, b) => a[0] - b[0] || b[1] - a[1])[0]

}