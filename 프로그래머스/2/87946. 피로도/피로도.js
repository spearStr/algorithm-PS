function solution(k, dungeons) {
    const n = dungeons.length
    const visit = Array(n).fill(false)
    let answer = 0

    function dfs(currentK, count) {
        answer = Math.max(answer, count)

        for (let i = 0; i < n; i++) {
            const [need, cost] = dungeons[i]
            if (!visit[i] && currentK >= need) {
                visit[i] = true
                dfs(currentK - cost, count + 1)
                visit[i] = false
            }
        }
    }

    dfs(k, 0)
    return answer
}