function solution(distance, rocks, n) {
    rocks.sort((a, b) => a - b);
    rocks.push(distance);
    
    let left = 1, right = distance;
    let answer = 0;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let removeCount = 0;
        let prev = 0;
        
        for (let rock of rocks) {
            if (rock - prev < mid) {
                removeCount++;
            } else {
                prev = rock;
            }
        }
        
        if (removeCount > n) {
            right = mid - 1;
        } else {
            answer = mid;
            left = mid + 1;
        }
    }
    
    return answer;
}