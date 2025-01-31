from collections import deque
import sys

input = sys.stdin.readline

N, L = map(int, input().split())
numbers = list(map(int, input().split()))

deq = deque()
result = []

for i in range(N):
    if deq and deq[0][0] <= i - L:
        deq.popleft()
     
    while deq and deq[-1][1] > numbers[i]:
        deq.pop()
    
    deq.append((i, numbers[i]))
    
    result.append(str(deq[0][1]))

print(' '.join(result))