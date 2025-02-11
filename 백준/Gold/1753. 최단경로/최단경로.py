import heapq
import sys

input = sys.stdin.read
data = input().splitlines()

vertex, edge = map(int, data[0].split())
start_node = int(data[1])

graph = [[] for _ in range(vertex + 1)]

for line in data[2:]:
    start, end, weight = map(int, line.split())
    graph[start].append((end, weight))

INF = float('inf')
answer = [INF] * (vertex + 1)
answer[start_node] = 0

pq = []
heapq.heappush(pq, (0, start_node))

while pq:
    current_weight, current_node = heapq.heappop(pq)
    
    if current_weight > answer[current_node]:
        continue

    for next_node, weight in graph[current_node]:
        new_weight = current_weight + weight
        
        if new_weight < answer[next_node]:
            answer[next_node] = new_weight
            heapq.heappush(pq, (new_weight, next_node))

for i in range(1, vertex + 1):
    if answer[i] == INF:
        print("INF")
    else:
        print(answer[i])
