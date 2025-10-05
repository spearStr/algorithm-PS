function solution(tickets) {
    let answer = ["ICN"]
    const info = new Map()

    for (const [start, end] of tickets) {
        if (info.has(start)) {
            info.get(start).push([end, false])
        } else {
            info.set(start, [[end, false]])
        }
    }

    for (const [key, value] of info) {
        value.sort((a, b) => a[0].localeCompare(b[0]))
    }

    const totalTickets = tickets.length

    function dfs(curr) {
        if (answer.length === totalTickets + 1) return true

        const nodeInfo = info.get(curr)
        if (!nodeInfo) return false

        for (let i = 0; i < nodeInfo.length; i++) {
            const [next, used] = nodeInfo[i]
            if (!used) {
                nodeInfo[i][1] = true
                answer.push(next)

                if (dfs(next)) return true

                answer.pop()
                nodeInfo[i][1] = false
            }
        }

        return false
    }

    dfs("ICN")
    
    return answer
}