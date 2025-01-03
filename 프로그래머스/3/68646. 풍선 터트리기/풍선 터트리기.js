function solution(a) {
    let cnt = 0
    const len = a.length
    const left_min = Array(len).fill(a[0]);
    const right_min = Array(len).fill(a[len - 1]);
    for (let i = 1; i < len; i++) {
        left_min[i] = Math.min(left_min[i - 1], a[i])
    }
    for (let i = len - 2; i > 0; i--) {
        right_min[i] = Math.min(right_min[i + 1], a[i])
    }
    for (let i = 0; i < len; i++) {
        if (a[i] > left_min[i] && a[i] > right_min[i]) {
            cnt += 1
        }
    }
    return len - cnt;
}