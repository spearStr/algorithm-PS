const fs = require('fs');
const [first, input] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split('\n');

const n = Number(first);
const liquid = input.trim().split(' ').map(Number);
let left = 0;
let right = n - 1;

liquid.sort((a, b) => a - b);
let temp = 2000000001;
let temp_left = liquid[left];
let temp_right = liquid[right];

while (left < right) {
    let sum = liquid[left] + liquid[right];

    if (Math.abs(sum) < Math.abs(temp)) {
        temp = sum;
        temp_left = liquid[left];
        temp_right = liquid[right];
    }

    if (sum < 0) {
        left += 1;
    } else if (sum > 0) {
        right -= 1;
    } else {
        break;
    }
}

console.log(temp_left, temp_right);
