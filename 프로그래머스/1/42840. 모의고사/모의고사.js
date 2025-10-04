function solution(answers) {
    const answer = []
    
    const first = [1, 2, 3, 4, 5]
    const second = [2, 1, 2, 3, 2, 4, 2, 5]
    const third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    
    let ans1 = 0
    let ans2 = 0
    let ans3 = 0
    
    let firstIdx = 0
    let secondIdx = 0
    let thirdIdx = 0
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === first[firstIdx]) ans1 += 1
        if (answers[i] === second[secondIdx]) ans2 += 1
        if (answers[i] === third[thirdIdx]) ans3 += 1
        
        firstIdx = (firstIdx + 1) % 5
        secondIdx = (secondIdx + 1) % 8
        thirdIdx = (thirdIdx + 1) % 10
    }
    
    const maxCount = Math.max(...[ans1, ans2, ans3])
    if (maxCount === ans1) answer.push(1)
    if (maxCount === ans2) answer.push(2)
    if (maxCount === ans3) answer.push(3)

    return answer.sort((a, b) => a - b)
}