function solution(r1, r2) {
    let answer = 0

    for (let x = 1; x <= r2; x++) {
        const maxY = Math.floor(Math.sqrt(r2 * r2 - x * x))
        const minY = x < r1 ? Math.ceil(Math.sqrt(r1 * r1 - x * x)) : 0

        if (maxY >= minY) {
            answer += maxY - minY + 1
        }
    }

    return answer * 4
}
