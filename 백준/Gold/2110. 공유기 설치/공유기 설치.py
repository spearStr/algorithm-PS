n, c = map(int, input().split())

arr = []
for _ in range(n):
    arr.append(int(input()))
arr.sort()
if c == 2:
    print(arr[n-1]-arr[0])
else:
    high, low = arr[n-1]-arr[0], 1
    while high >= low:
        mid = (high + low) // 2
        temp = arr[0]
        cnt = 0
        for i in arr:
            if i - temp >= mid:
                temp = i
                cnt += 1
        if cnt >= c-1:
            low = mid + 1
            ans = mid
        else:
            high = mid - 1
    print(ans)