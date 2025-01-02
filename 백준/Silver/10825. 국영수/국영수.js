const fs = require('fs');
const input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');

const n = Number(input[0]);
const inputData = input.slice(1);

const score = inputData.map((line) => {
    const [name, korean, english, math] = line.split(' ');
    return {
        name,
        korean: Number(korean),
        english: Number(english),
        math: Number(math),
    };
});

score.sort((a, b) => {
    if (a.korean !== b.korean) return b.korean - a.korean;
    if (a.english !== b.english) return a.english - b.english;
    if (a.math !== b.math) return b.math - a.math;

    for (let i = 0; i < Math.min(a.name.length, b.name.length); i++) {
        const charA = a.name.charCodeAt(i);
        const charB = b.name.charCodeAt(i);
        
        if (charA !== charB) {
            return charA - charB;
        }
    }
    
    return a.name.length - b.name.length;
});

score.forEach((student) => {
    console.log(student.name);
});
