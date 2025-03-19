function solution(relation) {
    const rowLen = relation.length;
    const colLen = relation[0].length;
    let candidateKeys = [];

    for (let bitMask = 1; bitMask < 2 ** colLen; bitMask++) {
        let selectedCols = [];

        for (let col = 0; col < colLen; col++) {
            if (bitMask & 2 ** col) selectedCols.push(col);
        }

        let uniqueSet = new Set();
        for (let row = 0; row < rowLen; row++) {
            const tuple = selectedCols.map(col => relation[row][col]).join(',')
            uniqueSet.add(tuple);
        }

        if (uniqueSet.size !== rowLen) continue;

        const isMinimal = candidateKeys.every(prevKey =>
            (prevKey & bitMask) !== prevKey
        );

        if (isMinimal) candidateKeys.push(bitMask);
    }

    return candidateKeys.length;
}
