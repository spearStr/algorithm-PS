function solution(distance, rocks, n) {
    rocks.sort((a, b) => a - b);
    rocks.push(distance);
    
    let low = 1
    let high = distance;
    let answer = 0;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let removeCount = 0;
        let prev = 0;
        
        for (let rock of rocks) {
            if (rock - prev < mid) {
                removeCount += 1;
            } else {
                prev = rock;
            }
        }
        
        if (removeCount > n) {
            high = mid - 1;
        } else {
            answer = mid;
            low = mid + 1;
        }
    }
    
    return answer;
}