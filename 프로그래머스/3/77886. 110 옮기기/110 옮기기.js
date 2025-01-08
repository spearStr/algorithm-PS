function is110(stack) {
    const size = stack.length
    if (size < 3) return false
    
    return stack[size - 3] === '1' && stack[size - 2] === '1' && stack[size - 1] === '0'
}

function solution(s) {
    const answer = []
    
    for (word of s) {
        let count = 0
        let tempString = ''
        const stack = []
        
        for (const letter of word) {
            stack.push(letter)
            if (is110(stack)) {
                stack.pop()
                stack.pop()
                stack.pop()
                count += 1
            }
        }
        tempString = stack.join("")
        const lastZeroIdx = tempString.lastIndexOf("0")
        const add110 = "110".repeat(count)

        if (tempString.length === 0) {
            answer.push(add110)
            continue;
        }
        
        if (lastZeroIdx === -1) {
            answer.push(add110 + tempString)
            continue;
        }

        answer.push(tempString.slice(0, lastZeroIdx + 1) + add110 + tempString.slice(lastZeroIdx + 1))
    }
    return answer
}