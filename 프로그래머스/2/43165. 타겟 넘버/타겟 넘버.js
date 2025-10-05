function solution(numbers, target) {
    let answer = 0
    
    dfs(0, 0)
    
    function dfs(count, sum) {
        if (count === numbers.length) {
            if (sum === target) answer += 1
            return
        }
        
        dfs(count + 1, sum + numbers[count])
        dfs(count + 1, sum - numbers[count])

    }
    
    return answer
}