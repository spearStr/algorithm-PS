function solution(food_times, k) {
    const foodSum = food_times.reduce((a, b) => a + b, 0);
    if (foodSum <= k) return -1

    let sortedFoods = food_times.map((time, index) => [time, index + 1]).sort((a, b) => a[0] - b[0]);

    let prevTime = 0;
    let foodCount = food_times.length;
    
    for (let i = 0; i < sortedFoods.length; i++) {
        let [currTime, index] = sortedFoods[i];
        let timeDiff = currTime - prevTime;

        if (timeDiff > 0) {
            let totalReduction = timeDiff * foodCount;

            if (k >= totalReduction) {
                k -= totalReduction;
                prevTime = currTime;
            } else {
                let remainingFoods = sortedFoods.slice(i).sort((a, b) => a[1] - b[1]);
                return remainingFoods[k % remainingFoods.length][1];
            }
        }
        foodCount -= 1
    }
    
    return -1;
}
