const fs = require('fs');
const input = fs.readFileSync("/dev/stdin", 'utf8').split('\n');
const score = [];

const n = Number(input[0]);

for (let i = 1; i <= n; i++) {
    const [name, korean, english, math] = input[i].split(' ');
    score.push({
        name,
        korean: Number(korean),
        english: Number(english),
        math: Number(math)
    });
}

score.sort((a, b) => {
    if (a.korean !== b.korean) return b.korean - a.korean;
    if (a.english !== b.english) return a.english - b.english;
    if (a.math !== b.math) return b.math - a.math;

    return a.name > b.name ? 1 : -1;
});

console.log(score.map((student) => student.name).join('\n'));
