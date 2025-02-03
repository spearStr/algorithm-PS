const fs = require('fs');
const [firstLine, input] = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const [L, C] = firstLine.split(' ').map(Number);
const letters = input.split(' ').sort();

const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
const answer = [];

function backtracking(index, secret) {
    if (secret.length === L) {
        const vowelCount = secret.split('').filter(c => vowels.has(c)).length;
        const consonantCount = L - vowelCount;

        if (vowelCount >= 1 && consonantCount >= 2) {
            answer.push(secret);
        }
        return;
    }

    for (let i = index; i < C; i++) {
        backtracking(i + 1, secret + letters[i]);
    }
}

backtracking(0, '');
console.log(answer.join('\n'));
