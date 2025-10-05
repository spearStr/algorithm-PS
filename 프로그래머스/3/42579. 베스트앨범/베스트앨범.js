function solution(genres, plays) {
    
    const genreMap = new Map()
    const countMap = new Map()
    for (let i = 0; i < genres.length; i++) {
        const count = countMap.get(genres[i])
        if (count) {
            countMap.set(genres[i], count + plays[i])
            
            const genre = genreMap.get(genres[i])
            genre.push([plays[i], i])
            genreMap.set(genres[i], genre)
        } else {
            countMap.set(genres[i], plays[i])
            genreMap.set(genres[i], [[plays[i], i]])
        }
    }
    
    const rank = []
    for (let [key, value] of countMap) {
        rank.push([key, value])
    }
    
    rank.sort((a, b) => {
        return b[1] - a[1]
    })
    
    const answer = []
    for (let i = 0; i < rank.length; i++) {
        const key = rank[i][0]
        const temp = genreMap.get(key)
        temp.sort((a, b) => {
            return b[0] - a[0] || a[1] - b[1]
        })
        
        if (temp.length > 1) {
            answer.push(temp[0][1])
            answer.push(temp[1][1])
        } else {
            answer.push(temp[0][1])
        }
    }
    
    return answer
}