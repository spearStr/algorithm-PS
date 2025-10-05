function solution(sizes) {
    sizes.sort((a, b) => {
        return b[0] - a[0] || b[1] - a[1]
    })
    
    let diffFlag = sizes[0][0] >= sizes[0][1] ? true : false
    for (let i = 1; i < sizes.length; i++) {
        const [row, col] = sizes[i]
        if ((diffFlag && row < col) || (!diffFlag && row > col)) {
            sizes[i][0] = col
            sizes[i][1] = row
        }
    }
    
    let maxCol = 0
    let maxRow = 0
    for (let i = 0; i < sizes.length; i++) {
        maxCol = Math.max(maxCol, sizes[i][0])
        maxRow = Math.max(maxRow, sizes[i][1])
    }
    
    return maxCol * maxRow
    
    
}