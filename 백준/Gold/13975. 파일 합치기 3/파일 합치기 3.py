import heapq

t = int(input())
for _ in range(t):
    n = int(input())
    ans = 0

    arr = list(map(int, input().split()))
    card = []
    for i in range(n):
        heapq.heappush(card, arr[i])

    while len(card) > 1:
        min1 = heapq.heappop(card)
        min2 = heapq.heappop(card)
        value = min1 + min2
        ans += value
        heapq.heappush(card, value)

    print(ans)