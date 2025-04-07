import sys
input = sys.stdin.readline

n, m = map(int, input().split())
numbers = list(map(int, input().split()))

positive = []
negative = []
for i in range(n):
    if numbers[i] > 0:
        positive.append(numbers[i])
    else:
        negative.append(-numbers[i])

positive.sort(reverse=True)
negative.sort(reverse=True)

distances = []

for i in range(0, len(positive), m):
    distances.append(positive[i])
for i in range(0, len(negative), m):
    distances.append(negative[i])

total = 0
maxDist = max(distances)
total += maxDist
total += 2 * (sum(distances) - maxDist)

print(total)