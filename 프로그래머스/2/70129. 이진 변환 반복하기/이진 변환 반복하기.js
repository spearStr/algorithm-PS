let zero_cnt = 0

function deleteZero(s) {
    const s_len = s.length;
    let deleted_zero = 0;
    for (let i = s_len - 1; i >= 0; i--) {
        if (s[i] === '0') {
            zero_cnt += 1
            deleted_zero += 1
        }
    }
    return '1'.repeat(s_len - deleted_zero)
}

function numberToBinary(number) {
    let binary_string = '';
    while (number >= 1) {
        binary_string = (number % 2) + binary_string;
        number = Math.floor(number / 2);
    }
    
    return binary_string
}

function solution(s) {
    if (s === '1') return [0, 0]
    let trans_cnt = 1
    let changed_number = deleteZero(s).length
    while (changed_number > 1) {
        const binary_string = numberToBinary(changed_number);
        changed_number = deleteZero(binary_string).length
        trans_cnt += 1
    }
    
    return [trans_cnt, zero_cnt]
}