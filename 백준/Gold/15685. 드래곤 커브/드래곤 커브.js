const fs = require('fs');
const [firstLine, ...input] = fs
    .readFileSync('dev/stdin')
    .toString()
    .trim()
    .split('\n');

const N = Number(firstLine);
const dragonCurve = input.map((line) => {
    return line.trim().split(' ').map(Number);
});

const coordinateArray = Array(101).fill(null).map(() => Array(101).fill(false));

function getStandard(x, y, direction) {
    if (direction === 0) {
        return { x: x + 1, y };
    } else if (direction === 1) {
        return { x, y: y - 1 };
    } else if (direction === 2) {
        return { x: x - 1, y };
    } else {
        return { x, y: y + 1 };
    }
}

function isValid(x, y) {
    return 0 <= x && x <= 100 && 0 <= y && y <= 100;
}

function findCoordinate(curve) {
    const [x, y, direction, generation] = curve;

    let endPoint = { x, y };
    let curveArray = [endPoint];
    let standard = getStandard(x, y, direction);

    if (generation === 0) {
        coordinateArray[x][y] = true;
        coordinateArray[standard.x][standard.y] = true
        return
    }

    let currentGeneration = 0;
    while (currentGeneration < generation) {
        const newCoordinates = [];
        let tempStandard = {};
        
        for (coordinate of curveArray) {
            const newX = standard.x - coordinate.y + standard.y;
            const newY = standard.y + coordinate.x - standard.x;
            if (isValid(newX, newY)) {
                newCoordinates.push({ x: newX, y: newY });
                if (
                    coordinate.x === endPoint.x &&
                    coordinate.y === endPoint.y
                ) {
                    newCoordinates.push(standard);
                    tempStandard = { x: newX, y: newY };
                }
            }
        }
        curveArray.push(...newCoordinates);
        standard = tempStandard
        currentGeneration += 1
    }

    for (const {x, y} of curveArray) {
        coordinateArray[x][y] = true
    }
}

for (let curve of dragonCurve) {
    findCoordinate(curve);
}

let answer = 0;
for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        if (
            coordinateArray[x][y] &&
            coordinateArray[x + 1][y] &&
            coordinateArray[x][y + 1] &&
            coordinateArray[x + 1][y + 1]
        ) {
            answer += 1;
        }
    }
}

console.log(answer);
