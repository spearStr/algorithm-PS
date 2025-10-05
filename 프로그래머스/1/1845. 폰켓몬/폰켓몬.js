function solution(nums) {
    let answer = 0
    
    const n = nums.length
    
    const monster = new Map()
    for (let i = 0; i < n; i++) {
        const value = monster.get(nums[i])
        if (value) {
            monster.set(nums[i], value + 1)
        } else {
            monster.set(nums[i], 1)
        }
    }
    
    const kindOf = monster.size

    return n / 2 < kindOf ? n / 2 : kindOf
}