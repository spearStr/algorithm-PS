function solution(topping) {
    let answer = 0
    const toppingCount = Array(10001).fill(0)
    const left = new Set()
    const right = new Set()
    for (let i = 0; i < topping.length; i++) {
        const target = topping[i]
        toppingCount[target] += 1
        right.add(target)
    }

    for (let i = 0; i < topping.length; i++) {
        const target = topping[i]
        left.add(target)
        toppingCount[target] -= 1
        if (toppingCount[target] === 0) right.delete(target)

        if (left.size === right.size) answer += 1
    }
    
    return answer
}