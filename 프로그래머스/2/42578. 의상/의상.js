function solution(clothes) {
    const clothesInfo = new Map()
    
    for (const [value, key] of clothes) {
        if (!clothesInfo.has(key)) {
            clothesInfo.set(key, 2)
        } else {
            clothesInfo.set(key, clothesInfo.get(key) + 1)
        }
    }
    
    let answer = 1
    for (const count of clothesInfo.values()) {
        answer *= count
    }
    
    return answer - 1;
}
