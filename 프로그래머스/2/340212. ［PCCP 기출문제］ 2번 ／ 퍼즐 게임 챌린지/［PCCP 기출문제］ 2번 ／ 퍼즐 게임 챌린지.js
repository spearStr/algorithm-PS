function solution(diffs, times, limit) {
    let left = 1
    let right = 0;
    
    diffs.forEach((item) => {
        if (right < item) right = item;
    });

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const result = checkTime(diffs, times, mid)
        
        if (result < limit) {
            right = mid - 1
        } else if (result > limit) {
            left = mid + 1
        } else {
            return mid
        }
    }
    return left
}

function checkTime(diffs, times, level) {
    let time = 0
    
    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] <= level) {
            time += times[i]
        } else {
            const prevTime = i > 0 ? times[i - 1] : 0;
            time += (diffs[i] - level) * (times[i] + prevTime) + times[i];

        }
    }
    
    return time
}