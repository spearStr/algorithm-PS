import heapq

n = int(input())
ans = 0

arr = []
for _ in range(n):
    card = int(input())
    heapq.heappush(arr, card)

while len(arr) > 1:
    min1 = heapq.heappop(arr)
    min2 = heapq.heappop(arr)
    value = min1 + min2
    ans += value
    heapq.heappush(arr, value)
    
print(ans)