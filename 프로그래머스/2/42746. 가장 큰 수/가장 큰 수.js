function solution(numbers) {
    let strArr = numbers.map(String);

    strArr.sort((a, b) => (b + a) - (a + b));

    if (strArr[0] === "0") return "0";

    return strArr.join("");
}
