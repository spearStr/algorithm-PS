function solution(gems) {
    let answer = [1, Infinity]
    let gap = Infinity
    let zeroCount = 0;
    
    const gemInfo = new Map()
    for (const gem of new Set(gems)) {
        gemInfo.set(gem, 0);
        zeroCount += 1;
    }
    
    let left = 0
    let right = 0
    while (right < gems.length) {
        if (gemInfo.get(gems[right]) === 0) zeroCount -= 1
        gemInfo.set(gems[right], gemInfo.get(gems[right]) + 1)
        right += 1

        while (zeroCount === 0) {
            if (gap > right - left) {
                gap = right - left;
                answer = [left + 1, right];
            }
            gemInfo.set(gems[left], gemInfo.get(gems[left]) - 1);
            if (gemInfo.get(gems[left]) === 0) zeroCount += 1;
            left += 1;
        }
    }
    
    return answer;
}