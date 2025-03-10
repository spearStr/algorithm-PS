class Node {
  constructor(value = "") {
    this.value = value;
    this.end = false;
    this.child = {};
    this.childLength = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(string) {
    let cur_node = this.root;
    for (const char of string) {
      const length = cur_node.childLength[string.length];
      if (!cur_node.child[char]) {
        cur_node.child[char] = new Node(cur_node.value + char);
      }
      cur_node.childLength[string.length] = length ? length + 1 : 1;
      cur_node = cur_node.child[char];
    }
    cur_node.end = true;
  }
    query(string) {
    let cur_node = this.root;
    for (const char of string) {
      if (char === "?") break;
      if (cur_node.child[char]) {
        cur_node = cur_node.child[char];
      } else {
        return 0;
      }
    }
    return cur_node.childLength[string.length] || 0;
  }
}

function solution(words, queries) {
    const answer = [];
    const forwardTrie = new Trie()
    const backwardTrie = new Trie()

    for (const word of words) {
        forwardTrie.insert(word);
        backwardTrie.insert(word.split("").reverse().join(""));
    }

    for (const query of queries) {
        if (query[0] === '?') {
            answer.push(backwardTrie.query(query.split("").reverse().join("")));
        } else {
            answer.push(forwardTrie.query(query));
        }
    }

    return answer;
}