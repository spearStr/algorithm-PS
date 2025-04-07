import sys
input = sys.stdin.readline

n = int(input())
k = int(input())
numbers = sorted(list(map(int, input().split(' '))))


def solution():
    if k >= n:
        print(0)
        return

    dist = []
    for i in range(1, n):
        dist.append(numbers[i] - numbers[i - 1])
    
    dist.sort()
    for _ in range(k - 1):
        dist.pop()
    
    print(sum(dist))


solution()