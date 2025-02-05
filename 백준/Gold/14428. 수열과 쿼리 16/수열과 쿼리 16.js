class SegmentTree {
    constructor(n, arr) {
        this.n = n;
        this.tree = Array(4 * this.n).fill([Infinity, Infinity]);
        this.build(arr, 1, 0, this.n - 1);
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = [arr[start], start + 1];
            return;
        }

        const mid = Math.floor((start + end) / 2);
        this.build(arr, 2 * node, start, mid);
        this.build(arr, 2 * node + 1, mid + 1, end);
        this.tree[node] = this._minIndex(
            this.tree[2 * node],
            this.tree[2 * node + 1]
        );
    }

    update(idx, value, node, start, end) {
        if (idx < start || idx > end) return;
        if (start === end) {
            this.tree[node] = [value, start + 1];
            return
        }

        const mid = Math.floor((start + end) / 2);
        this.update(idx, value, 2 * node, start, mid);
        this.update(idx, value, 2 * node + 1, mid + 1, end);
        this.tree[node] = this._minIndex(this.tree[2 * node], this.tree[2 * node + 1])
    }

    query(left, right, node, start, end) {
        if (right < start || left > end) return [Infinity, Infinity];
        if (left <= start && end <= right) return this.tree[node];

        const mid = Math.floor((start + end) / 2);
        return this._minIndex(
            this.query(left, right, 2 * node, start, mid),
            this.query(left, right, 2 * node + 1, mid + 1, end)
        );
    }

    _minIndex(a, b) {
        if (a[0] < b[0]) return a;
        if (a[0] > b[0]) return b;
        return a[1] < b[1] ? a : b;
    }
}

const fs = require('fs');
const [first, second, third, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const n = Number(first);
const arr = second.split(' ').map(Number);
const m = Number(third);

const segTree = new SegmentTree(n, arr);

const answer = [];
for (let i = 0; i < m; i++) {
    const [type, value1, value2] = input[i].split(' ').map(Number);
    if (type === 1) {
        segTree.update(value1 - 1, value2, 1, 0, n - 1)
    } else {
        answer.push(segTree.query(value1 - 1, value2 - 1, 1, 0, n - 1)[1]);
    }
}

console.log(answer.join('\n'));
