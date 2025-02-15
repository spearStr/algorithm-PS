class TrieNode {
    constructor(depth) {
        this.children = {}
        this.isEnd = false
        this.depth = depth
        this.count = 0
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(0)
    }

    insert(word) {
        let node = this.root
        for (const alpha of word) {
            if (!node.children[alpha]) {
                node.children[alpha] = new TrieNode(node.depth + 1)
            }
            node = node.children[alpha]
            node.count += 1
        }
        node.isEnd = true
    }

    search(node) {
        let cnt = 0;

        for (const key in node.children) {
            const child = node.children[key];

            if (child.isEnd) cnt += child.depth;
            else if (child.count === 1) {
                cnt += child.depth;
                continue;   
            }

            cnt += this.search(child);
        }

        return cnt;
    }
}

function solution(words) {
    const trie = new Trie()
    for (const word of words) {
        trie.insert(word)
    }

    const answer = trie.search(trie.root);
    return answer;
}