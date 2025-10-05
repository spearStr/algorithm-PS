function solution(arr) {
    let answer = []
    
    let standard = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === standard) continue
        
        answer.push(arr[i])
        standard = arr[i]
    }
    
    return answer
}