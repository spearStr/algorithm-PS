

const fs = require('fs');
const [first, second, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = first.split(' ').map(Number);
const bosses = [-1, ...second.split(' ').map(Number)];

function solution() {
	let idx = 0;
	let answer = [];

	const child = Array(N + 1)
		.fill()
		.map(() => []);

	for (let i = 2; i < bosses.length; i++) {
		child[bosses[i]].push(i);
	}

	const points = Array(N + 1).fill(0);

	for (let i = 0; i < M; i++) {
		const [num, point] = input[i].split(' ').map(Number);
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