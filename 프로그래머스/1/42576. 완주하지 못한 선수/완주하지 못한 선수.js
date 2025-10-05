function solution(participant, completion) {
    let answer = ''
    
    const marathon = new Map()
    for (let i = 0; i < participant.length; i++) {
        const value = marathon.get(participant[i])
        if (value) {
            marathon.set(participant[i], value + 1)
        } else {
            marathon.set(participant[i], 1)
        }
    }
    
    for (let i = 0; i < completion.length; i++) {
        const value = marathon.get(completion[i])
        marathon.set(completion[i], value - 1)
    }
    
    for (const [name, value] of marathon.entries()) {
        if (value > 0) return name
    }
    
}