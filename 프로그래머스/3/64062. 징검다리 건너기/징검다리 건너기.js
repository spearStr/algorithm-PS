function solution(stones, k) {
    const n = stones.length

    function canJump(mid) {
        let count = 0
        for (let i = 0; i < n; i++) {
            if (stones[i] <= mid) {
                count += 1
            } else {
                count = 0
            }
            if (count >= k) return false
        }
        return true
    }

    let left = 1
    let right = 200000000

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        
        if (canJump(mid)) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return left
}
