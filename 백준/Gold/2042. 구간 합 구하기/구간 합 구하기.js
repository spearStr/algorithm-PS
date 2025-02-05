class SegmentTree {
    constructor(arr) {
        this.n = arr.length
        this.tree = Array(4 * this.n).fill(0)
        this.build(arr, 1, 0, this.n - 1)
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start]
            return
        }

        const mid = Math.floor((start + end) / 2)
        this.build(arr, 2 * node, start, mid)
        this.build(arr, 2 * node + 1, mid + 1, end)
        this.tree[node] = BigInt(this.tree[2 * node]) + BigInt(this.tree[2 * node + 1])
    }

    update(idx, value, node, start, end) {
        if (idx < start || idx > end) return
        if (start === end) {
            this.tree[node] = BigInt(value)
            return
        }

        const mid = Math.floor((start + end) / 2)
        this.update(idx, value, 2 * node, start, mid)
        this.update(idx, value, 2 * node + 1, mid + 1, end)
        this.tree[node] = BigInt(this.tree[2 * node]) + BigInt(this.tree[2 * node + 1])
    }

    query(left, right, node, start, end) {
        if (left > end || right < start) return BigInt(0)
        if (left <= start && end <= right) return this.tree[node]

        const mid = Math.floor((start + end) / 2)
        return BigInt(this.query(left, right, 2 * node, start, mid)) + BigInt(this.query(left, right, 2 * node + 1, mid + 1, end))
    }
}

const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m, k] = firstLine.split(' ').map(Number)

let line = 0;

const arr = []
for (let i = 0; i < n; i++) {
    arr.push(BigInt(input[line++]))
}

const segTree = new SegmentTree(arr)

const answer = []
for (let i = 0; i < m + k; i++) {
    const [type, value1, value2] = input[line++].split(' ').map(BigInt)

    if (type === BigInt(1)) {
        segTree.update(value1 - BigInt(1), value2, 1, 0, n - 1)
    } else {
        answer.push(segTree.query(value1 - BigInt(1), value2 - BigInt(1), 1, 0, n - 1))
    }
}

console.log(answer.join('\n'))