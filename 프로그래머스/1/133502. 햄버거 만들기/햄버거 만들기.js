// 1 - 빵, 2 - 야채, 3 - 고기
// 빵 야채 고기 빵
// 1 2 3 1
function solution(ingredient) {
    let answer = 0

    const stack = []
    for (let i = 0; i < ingredient.length; i++) {
        stack.push(ingredient[i])
        if (stack.length >= 4) {
            const slicedStack = stack.slice(-4)
            if (slicedStack.join('') === '1231') {
                answer += 1
                for (let j = 0; j < 4; j++) stack.pop()
            }
        }
    }
    
    return answer
}