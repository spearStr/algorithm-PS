const fs = require('fs');
const K = Number(fs.readFileSync('dev/stdin').toString().trim());

let chocolate = 1
while (chocolate < K) {
    chocolate *= 2
}

let count = 0;
let temp = chocolate;
let sum = 0;

if (chocolate === K) {
    console.log(chocolate, count)
} else {
    while (sum < K) {
        if (sum + temp / 2 <= K) {
            sum += temp / 2;
        }
        temp /= 2;
        count += 1
    }
    
    console.log(chocolate, count);
}
