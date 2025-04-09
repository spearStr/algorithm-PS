from collections import deque

def solution(n, roads, sources, destination):
    graph = [[] for _ in range(n + 1)]
    
    for start, end in roads:
        graph[start].append(end)
        graph[end].append(start)
        
    dist = [-1] * (n + 1)
    dist[destination] = 0
    
    queue = deque([destination])
    
    while queue:
        current = queue.popleft()
        for neighbor in graph[current]:
            if dist[neighbor] == -1:
                dist[neighbor] = dist[current] + 1
                queue.append(neighbor)
                
    answer = [dist[source] for source in sources]
    
    return answer
