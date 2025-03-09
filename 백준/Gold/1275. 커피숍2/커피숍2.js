const fs = require('fs')
const [first, second, ...input] = fs.readFileSync(fs.existsSync("dev/stdin") ? "dev/stdin" : "input.txt").toString().trim().split('\n')

const [n, q] = first.split(' ').map(Number)
const numbers = second.split(' ').map(Number)
const orders = []
for (let i = 0; i < q; i++) {
    const [start, end, index, value] = input[i].split(' ').map(Number)
    orders.push([start - 1, end - 1, index - 1, value])

}

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
        this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1]
    }

    update(idx, value, node, start, end) {
        if (idx < start || idx > end) return ;
        if (start === end) {
            this.tree[node] = value
            return
        }

        const mid = Math.floor((start + end) / 2)
        this.update(idx, value, 2 * node, start, mid)
        this.update(idx, value, 2 * node + 1, mid + 1, end)
        this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1]
    }

    query(left, right, node, start, end) {
        if (left > end || right < start) return 0
        if (left <= start && end <= right) return this.tree[node]

        const mid = Math.floor((start + end) / 2)
        return this.query(left, right, 2 * node, start, mid) + this.query(left, right, 2 * node + 1, mid + 1, end)
    }
}

const segTree = new SegmentTree(numbers)

const answer = []
for (const order of orders) {
    const [start, end, index, value] = order
    const smaller = Math.min(start, end)
    const bigger = Math.max(start, end)

    answer.push(segTree.query(smaller, bigger, 1, 0, n - 1))
    segTree.update(index, value, 1, 0, n - 1)
}

console.log(answer.join('\n'))