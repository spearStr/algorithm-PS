function solution(phone_book) {
    
    const phone = new Map()
    for (let i = 0; i < phone_book.length; i++) {
        let letter = ''
        for (let j = 0; j < phone_book[i].length; j++) {
            letter += phone_book[i][j]
            const value = phone.get(letter)
            if (value) {
                phone.set(letter, value + 1)
            } else {
                phone.set(letter, 1)
            }
        }
    }
    
    for (let i = 0; i < phone_book.length; i++) {
        const value = phone.get(phone_book[i])
        if (value > 1) return false
    }
    
    return true
}