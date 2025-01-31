const fs = require('fs')
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n')

let line = 0;
while (true) {
    const limit = Number(input[line++])

    if (limit === 0) break;

    const sentence = input[line++].trim()
    solution(limit, sentence)
}

function solution(limit, sentence) {
    let left = 0;
    let right = 0;
    let answer = 0;
    const charMap = new Map();

    while (right < sentence.length) {
        charMap.set(sentence[right], (charMap.get(sentence[right]) || 0) + 1);

        while (charMap.size > limit) {
            charMap.set(sentence[left], charMap.get(sentence[left]) - 1);
            
            if (charMap.get(sentence[left]) === 0) {
                charMap.delete(sentence[left]);
            }
            
            left += 1
        }

        answer = Math.max(answer, right - left + 1);
        right += 1
    }

    console.log(answer);
}