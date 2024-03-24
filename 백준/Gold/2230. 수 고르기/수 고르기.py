n, m = map(int, input().split())
number = []

for _ in range(n):
    num = int(input())
    number.append(num)

left, right = 0, 0
number.sort()
answer = 2000000000

while right < n:
    gap = abs(number[right] - number[left])
    if gap >= m:
        if gap == m:
            answer = m
            break
        else:
            left += 1
            answer = min(answer, gap)
    else:
        right += 1
print(answer)