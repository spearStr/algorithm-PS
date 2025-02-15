class TrieNode {
    constructor() {
        this.children = {}
        this.isEnd = false
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    insert(number) {
        let node = this.root
        for (let digit of number) {
            if (!node.children[digit]) {
                node.children[digit] = new TrieNode()
            }
            node = node.children[digit]

            if (node.isEnd) return false
        }

        node.isEnd = true

        if (Object.keys(node.children).length > 0) return false

        return true
    }
}

const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const t = Number(firstLine)

let line = 0
const answer = []
for (let i = 0; i < t; i++) {
    const n = Number(input[line++])
    const numbers = []

    for (let j = 0; j < n; j++) {
        numbers.push(input[line++].trim())
    }

    numbers.sort()

    const trie = new Trie()
    let isConsistent = true

    for (let number of numbers) {
        if (!trie.insert(number)) {
            isConsistent = false
            break
        }
    }

    answer.push(isConsistent ? "YES" : "NO")
}

console.log(answer.join('\n'))