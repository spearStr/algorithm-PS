n, k = map(int, input().split())
numbers = list(map(int, input().split()))
left, right = 0, 0
cnt = 0

answer = 0
cnt_ans = 0
while right < n:
    if numbers[right] % 2 == 1:
        if cnt < k:
            right += 1
            cnt += 1
        else:
            if numbers[left] % 2 == 1:
                cnt -= 1
            left += 1
    else:
        right += 1
    if answer < right - left:
        answer = right - left
        cnt_ans = cnt
    elif answer == right - left:
        cnt_ans = min(cnt_ans, cnt)
print(answer - cnt_ans)