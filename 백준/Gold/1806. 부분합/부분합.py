n, s = map(int, input().split())
number = list(map(int, input().split()))

left, right = 0, 0
section_sum = 0

answer = n + 1
while True:
    if section_sum >= s:
        if right == 0:
            answer = 1
            break
        section_sum -= number[left]
        answer = min(answer, right - left)
        left += 1
    elif right == n:
        break
    else:
        section_sum += number[right]
        right += 1

if answer == n + 1:
    print(0)
else:
    print(answer)