function solution(n, t, m, timetable) {
    timetable = timetable.map((time) => {
        const [hour, minute] = time.split(":")
        return Number(hour) * 60 + Number(minute)
    })
    timetable.sort((a, b) => a - b)    

    let answerTime = 9 * 60
    for(let i = 1 ; i <= n ; i++) {
        const canTakeBus = timetable.filter(time => time <= answerTime).length
        
        if(i === n) {
            if(canTakeBus >= m) {
                answerTime = timetable[m - 1] - 1
            }
        } else {
            timetable.splice(0, Math.min(canTakeBus, m))
            answerTime += t
        }
    }
    
    return String(Math.floor(answerTime / 60)).padStart(2, '0') + ':' + String(Math.floor(answerTime % 60)).padStart(2, '0')
}