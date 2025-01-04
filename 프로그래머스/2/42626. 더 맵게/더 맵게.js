class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parentValue = this.heap[parentIndex];

            if (value >= parentValue) break;

            this.heap[index] = parentValue;
            index = parentIndex;
        }
        this.heap[index] = value;
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const minValue = this.heap[0];
        this.heap[0] = this.heap.pop();

        let index = 0;
        const length = this.heap.length;
        const value = this.heap[index];

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallerChildIndex = leftChildIndex;

            if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                smallerChildIndex = rightChildIndex;
            }

            if (smallerChildIndex >= length || this.heap[smallerChildIndex] >= value) break;

            this.heap[index] = this.heap[smallerChildIndex];
            index = smallerChildIndex;
        }
        this.heap[index] = value;
        return minValue;
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }
}

function solution(scoville, K) {
  const minHeap = new MinHeap();

  for (const sco of scoville) {
    minHeap.push(sco);
  }

  let ans = 0;

  while (minHeap.size() >= 2 && minHeap.peek() < K) {
    const first = minHeap.pop();
    const second = minHeap.pop();
    const mixedScov = first + second * 2;
    minHeap.push(mixedScov);
    ans += 1;
  }

  return minHeap.peek() >= K ? ans : -1;
}