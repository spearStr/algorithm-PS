function solution(dices) {
    let n = dices.length;
    let maxWin = 0;
    let answer = [];
    
    function backtrack(chosen, start) {
        if (chosen.length === n / 2) {
            let remaining = [];
            for (let i = 1; i <= n; i++) {
                if (!chosen.includes(i)) remaining.push(i);
            }
            let winCnt = totalWin(chosen, remaining);
            if (winCnt > maxWin) {
                maxWin = winCnt;
                answer = [...chosen];
            }
            return
        }

        for (let i = start; i <= n; i++) {
            chosen.push(i);
            backtrack(chosen, i + 1);
            chosen.pop();
        }
    }

    function totalWin(A, B) {
        let ASums = getSums(A.map(i => dices[i - 1]));
        let BSums = getSums(B.map(i => dices[i - 1]));
        
        let wins = 0
        for (const a in ASums) {
            for (const b in BSums) {
                if (parseInt(a) > parseInt(b)) {
                    wins += ASums[a] * BSums[b];
                }
            }
        }
        return wins;
    }

    function getSums(selectedDices) {
        let counts = {};
        function dfs(index, sum) {
            if (index === selectedDices.length) {
                counts[sum] = (counts[sum] || 0) + 1;
                return;
            }
            for (const value of selectedDices[index]) {
                dfs(index + 1, sum + value);
            }
        }
        dfs(0, 0);
        return counts;
    }

    backtrack([], 1);
    return answer;
}
