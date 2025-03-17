function solution(s) {
    let answer = s.length

    for (let i = 1; i <= Math.floor(s.length / 2); i++) {
        let compressed = ""
        let prev = s.slice(0, i)
        let count = 1

        for (let j = i; j < s.length; j += i) {
            let curr = s.slice(j, j + i)
            if (prev === curr) {
                count += 1
            } else {
                compressed += (count > 1 ? count + prev : prev)
                prev = curr
                count = 1
            }
        }
        
        compressed += (count > 1 ? count + prev : prev)

        answer = Math.min(answer, compressed.length)
    }

    return answer;
}
