const fs = require('fs');
const firstLine = fs.readFileSync("/dev/stdin").toString().trim();
const n = Number(firstLine);
let cnt = 0;

let left = 0;
let right = 0;
const primeArray = [];

function findPrimeNumber(limit) {
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= limit; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= limit; j += i) {
                isPrime[j] = false;
            }
        }
    }

    for (let i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            primeArray.push(i);
        }
    }
}

function solution() {
    if (n === 1) {
        console.log(0);
        return;
    }

    let sum = primeArray[right];
    while (primeArray[right] <= n) {
        if (sum === n) {
            cnt += 1;
            right += 1;
            sum += primeArray[right];
        } else if (sum < n) {
            right += 1;
            sum += primeArray[right];
        } else {
            sum -= primeArray[left];
            left += 1;
        }
    }
    console.log(cnt);
}

findPrimeNumber(n);
solution();
