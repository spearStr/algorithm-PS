import sys
from itertools import permutations
input = sys.stdin.readline

n = int(input())
innings = [list(map(int, input().split())) for _ in range(n)]

maxScore = 0

for order in permutations(range(1, 9)):
    lineup = order[:3] + (0,) + order[3:]

    score = 0
    idx = 0

    for inning in innings:
        out = 0
        b1 = b2 = b3 = 0

        while out < 3:
            player = lineup[idx]
            result = inning[player]

            if result == 0:
                out += 1
            elif result == 1:
                score += b3
                b3, b2, b1 = b2, b1, 1
            elif result == 2:
                score += b3 + b2
                b3, b2, b1 = b1, 1, 0
            elif result == 3:
                score += b3 + b2 + b1
                b3, b2, b1 = 1, 0, 0
            elif result == 4:
                score += b3 + b2 + b1 + 1
                b3 = b2 = b1 = 0

            idx = (idx + 1) % 9

    maxScore = max(maxScore, score)

print(maxScore)
