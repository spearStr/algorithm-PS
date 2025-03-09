function solution(plans) {
    const answer = []
    const task = []
    
    const newPlans = []
    for (const plan of plans) {
        const [subject, time, cost] = plan
        const [hour, min] = time.split(':').map(Number)
        const startTime = hour * 60 + min
        newPlans.push([subject, startTime, Number(cost)])
    }
    
    newPlans.sort((a, b) => a[1] - b[1])

    let currentTime = 0
    while (answer.length !== plans.length) {
        if (task.length === 0) {
            task.push(newPlans.shift())
        }
        
        const [subject, startTime, cost] = task.pop()
        currentTime = Math.max(currentTime, startTime)
        
        if (newPlans.length === 0) {
            answer.push(subject)
            currentTime += cost
            continue
        }
        
        if (newPlans[0][1] >= currentTime + cost) {
            answer.push(subject)
            if (newPlans[0][1] === currentTime + cost) {
                task.push(newPlans.shift())
            }
            currentTime += cost
        } else {
            const gap = currentTime + cost - newPlans[0][1]
            task.push([subject, newPlans[0][1], gap])
            task.push(newPlans.shift())
        }
    }
    
    return answer
}