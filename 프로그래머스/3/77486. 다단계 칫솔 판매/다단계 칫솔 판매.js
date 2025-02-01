function solution(enroll, referral, seller, amount) {
    const profits = {};
    const referralMap = {};
    
    enroll.forEach((name, i) => {
        profits[name] = 0;
        referralMap[name] = referral[i];
    });
    
    seller.forEach((name, i) => {
        let currentPerson = name;
        let currentAmount = amount[i] * 100;
        
        while (currentPerson !== "-" && currentAmount > 0) {
            const tax = Math.floor(currentAmount * 0.1);           
            profits[currentPerson] += currentAmount - tax;
            currentAmount = tax;
            currentPerson = referralMap[currentPerson];
        }
    });
    
    return enroll.map(name => profits[name]);
}