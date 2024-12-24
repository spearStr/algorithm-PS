function solution(my_string, overwrite_string, s) {
    let answer = '';
    for (i = 0; i < s; i++) {
        answer += my_string[i]
    }
    answer += overwrite_string
    const lengthDiff = my_string.length - overwrite_string.length - s;
    if (lengthDiff > 0) {
        for (i = s + overwrite_string.length; i < my_string.length; i++) {
            answer += my_string[i]
        }
    }
    return answer;
}