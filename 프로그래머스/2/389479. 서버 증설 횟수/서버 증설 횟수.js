function solution(players, m, k) {
    let answer = 0;
    const serverCnt = Array(players.length + 1).fill(0)
    const kQueue = []
    
    for (let i = 1; i < players.length + 1; i++) {
        let prevServer = serverCnt[i - 1]
        const needServer = Math.floor(players[i - 1] / m)
        
        if (kQueue.length > 0 && kQueue[0][0] === i) {
            prevServer -= kQueue[0][1]
            kQueue.shift()
        }
        
        if (needServer > prevServer) {
            const openServer = needServer - prevServer;
            answer += openServer;
            prevServer = needServer;
            kQueue.push([i + k, openServer]);
        }
        
        serverCnt[i] = prevServer
    }
    
    return answer;
}