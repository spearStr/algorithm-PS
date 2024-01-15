n = int(input())

pos = []
neg = []
zero = 0
ans = 0

for i in range(n):
    num = int(input())
    if num > 0:
        pos.append(num)
    elif num < 0:
        neg.append(num)
    else:
        zero += 1

pos.sort(reverse=True)
neg.sort()

if len(pos) <= 1:
    ans += sum(pos)
else:
    for i in range(0, len(pos), 2):
        if i + 1 == len(pos):
            ans += pos[i]
        elif pos[i] == 1 or pos[i+1] == 1:
            ans += pos[i] + pos[i+1]
        else:
            ans += pos[i] * pos[i+1]

if len(neg) == 0:
    ans += 0
elif len(neg) == 1:
    if zero > 0:
        ans += 0
    else:
        ans += sum(neg)
else:
    for i in range(0, len(neg), 2):
        if i + 1 == len(neg):
            if zero > 0:
                ans += 0
            else:
                ans += neg[i]
        else:
            ans += neg[i] * neg[i+1]

print(ans)