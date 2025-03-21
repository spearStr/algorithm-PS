function solution(book_time) {
    let answer = 0
    const n = book_time.length
    const roomCount = Array(n).fill(false)

    const bookTime = book_time.map(([time1, time2]) => {
        const [startHour, startMin] = time1.split(":").map(Number)
        const [endHour, endMin] = time2.split(":").map(Number)
        return [startHour * 60 + startMin, endHour * 60 + endMin + 10]
    })
    
    bookTime.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    
    const roomCheck = Array(n).fill(null).map(() => Array(1451).fill(false))
    
    for (const [start, end] of bookTime) {
        for (let i = 0; i < n; i++) {
            let isEmpty = true
            for (let j = start; j < end; j = j + 10) {
                if (roomCheck[i][j]) {
                    isEmpty = false
                    break
                }
            }
            
            if (isEmpty) {
                for (let j = start; j < end; j++) {
                    roomCheck[i][j] = true
                }
                roomCount[i] = true
                break
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (roomCount[i]) {
            answer += 1
        } else {
            break
        }
    }
    
    return answer
}