const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim();

const regex = /^(100+1+|01)+$/;
if (input.match(regex)) {
    console.log("SUBMARINE");
} else {
    console.log("NOISE");
}
