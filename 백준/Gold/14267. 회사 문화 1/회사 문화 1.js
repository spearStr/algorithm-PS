const input = require('fs')
	.readFileSync('/dev/stdin')
	.toString()
	.trim()
	.split('\n');

function solution() {
	let idx = 0;
	let answer = [];

	const [N, M] = input[idx++].split(' ').map(Number);
	const parent = [-1, ...input[idx++].split(' ').map(Number)];
	const child = Array(N + 1)
		.fill()
		.map(() => []);

	for (let i = 2; i < parent.length; i++) {
		child[parent[i]].push(i);
	}

	const points = Array(N + 1).fill(0);

	for (let i = 0; i < M; i++) {
		const [num, point] = input[idx++].split(' ').map(Number);
		points[num] += point;
	}

	function dfs(n, point) {
		points[n] = point;
		for (let next of child[n]) {
			dfs(next, point + points[next]);
		}
	}

	dfs(1, 0);

	answer = points.slice(1);

	return answer.join(' ');
}

console.log(solution());