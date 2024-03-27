n = int(input())
arr = list(map(int, input().split()))

m = int(input())
to_find = list(map(int, input().split()))

arr.sort()

for i in range(m):
    low, high = 0, n-1
    flag = True
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] > to_find[i]:
            high = mid - 1
        elif arr[mid] < to_find[i]:
            low = mid + 1
        else:
            flag = False
            break
    if flag:
        print(0)
    else:
        print(1)