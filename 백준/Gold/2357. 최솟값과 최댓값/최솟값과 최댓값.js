class SegmentTree {
    constructor(arr) {
        this.n = arr.length
        this.tree = Array(4 * this.n).fill([Infinity, -Infinity])
        this.build(arr, 1, 0, this.n - 1)
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = [arr[start], arr[start]]
            return
        }

        const mid = Math.floor((start + end) / 2)
        this.build(arr, 2 * node, start, mid)
        this.build(arr, 2 * node + 1, mid + 1, end)
        this.tree[node] = this._findValue(this.tree[2 * node], this.tree[2 * node + 1])
    }

    query(left, right, node, start, end) {
        if (left > end || right < start) return [Infinity, -Infinity]
        if (left <= start && end <= right) return this.tree[node]

        const mid = Math.floor((start + end) / 2)
        return this._findValue(this.query(left, right, 2 * node, start, mid), this.query(left, right, 2 * node + 1, mid + 1, end))
    }

    _findValue(node1, node2) {
        return [Math.min(node1[0], node2[0]), Math.max(node1[1], node2[1])]
    }
}

const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)

let line = 0;
const arr = []
for (let i = 0; i < n; i++) {
    arr.push(Number(input[line++]))
}

const segTree = new SegmentTree(arr);

const answer = []
for (let i = 0; i < m; i++) {
    const [left, right] = input[line++].split(' ').map(Number)
    answer.push(segTree.query(left - 1, right - 1, 1, 0, n - 1))
}

console.log(answer.map(([min, max]) => `${min} ${max}`).join('\n'))