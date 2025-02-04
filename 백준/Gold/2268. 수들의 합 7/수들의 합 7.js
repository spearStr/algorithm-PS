class SegmentTree {
    constructor(n) {
        this.n = n
        this.tree = Array(4 * n).fill(0)
    }

    sum(left, right, node, leftNode, rightNode) {
        if (right < leftNode || left > rightNode) return 0;
        if (left <= leftNode && rightNode <= right) return this.tree[node]

        const mid = Math.floor((leftNode + rightNode) / 2)
        return this.sum(left, right, 2 * node, leftNode, mid) + this.sum(left, right, 2 * node + 1, mid + 1, rightNode)
    }

    update(idx, diff, node, leftNode, rightNode) {
        if (idx < leftNode || idx > rightNode) return;
        this.tree[node] += diff

        if (leftNode !== rightNode) {
            const mid = Math.floor((leftNode + rightNode) / 2)
            this.update(idx, diff, 2 * node, leftNode, mid)
            this.update(idx, diff, 2 * node + 1, mid + 1, rightNode)
        }
    }

    query(left, right) {
        return this.sum(left, right, 1, 0, this.n - 1)
    }

    modify(idx, value) {
        const diff = value - this.sum(idx, idx, 1, 0, this.n - 1);
        this.update(idx, diff, 1, 0, this.n - 1)
    }
}

const fs = require('fs')
const [firstLine, ...input] = fs.readFileSync('dev/stdin').toString().trim().split('\n')

const [n, m] = firstLine.split(' ').map(Number)
const segTree = new SegmentTree(n)

const answer = []
for (let i = 0; i < m; i++) {
    const [mode, value1, value2] = input[i].split(' ').map(Number)

    if (mode === 0) {
        const left = Math.min(value1, value2) - 1;
        const right = Math.max(value1, value2) - 1;
        answer.push(segTree.query(left, right));
    } else {
        segTree.modify(value1 - 1, value2)
    }
}

console.log(answer.join("\n"));