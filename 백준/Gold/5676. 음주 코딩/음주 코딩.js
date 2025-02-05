class SegmentTree {
    constructor(arr) {
        this.n = arr.length
        this.tree = Array(4 * this.n).fill(1)
        this.build(arr, 1, 0, this.n - 1)
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = Math.sign(arr[start])
            return
        }

        const mid = Math.floor((start + end) / 2)
        this.build(arr, 2 * node, start, mid)
        this.build(arr, 2 * node + 1, mid + 1, end)
        this.tree[node] = this.tree[2 * node] * this.tree[2 * node + 1]
    }

    update(idx, value, node, start, end) {
        if (idx < start || idx > end) return ;
        if (start === end) {
            this.tree[node] = Math.sign(value)
            return
        }

        const mid = Math.floor((start + end) / 2)
        this.update(idx, value, 2 * node, start, mid)
        this.update(idx, value, 2 * node + 1, mid + 1, end)
        this.tree[node] = this.tree[2 * node] * this.tree[2 * node + 1]
    }

    query(left, right, node, start, end) {
        if (left > end || right < start) return 1
        if (left <= start && end <= right) return this.tree[node]

        const mid = Math.floor((start + end) / 2)
        return this.query(left, right, 2 * node, start, mid) * this.query(left, right, 2 * node + 1, mid + 1, end)
    }
}

const fs = require('fs')
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n')

let line = 0;
while (true) {
    if (!input[line]) break;

    const [n, m] = input[line++].split(' ').map(Number)
    const arr = input[line++].split(' ').map(Number)

    const segTree = new SegmentTree(arr)
    let answer = ''
    for (let i = 0; i < m; i++) {
        const [type, value1, value2] = input[line++].split(' ')
        const numValue1 = Number(value1)
        const numValue2 = Number(value2)

        if (type === 'C') {
            segTree.update(numValue1 - 1, numValue2, 1, 0, n - 1)
        } else {
            const result = segTree.query(numValue1 - 1, numValue2 - 1, 1, 0, n - 1)
            if (result > 0) {
                answer += '+'
            } else if (result < 0) {
                answer += '-'
            } else {
                answer += '0'
            }
        }
    }
    console.log(answer)
}
