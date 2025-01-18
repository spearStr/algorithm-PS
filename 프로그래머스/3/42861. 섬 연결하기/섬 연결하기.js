function solution(n, costs) {
    let answer = 0;

    const parent = Array.from({ length: n }, (_, i) => i);

    const find = (node) => {
        if (parent[node] !== node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    };

    const union = (node1, node2) => {
        const root1 = find(node1);
        const root2 = find(node2);
        if (root1 !== root2) {
            parent[root2] = root1;
        }
    };

    costs.sort((a, b) => a[2] - b[2]);

    for (const [start, end, cost] of costs) {
        if (find(start) !== find(end)) {
            union(start, end);
            answer += cost;
        }
    }

    return answer;
}