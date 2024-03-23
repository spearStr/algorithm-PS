def solution(scores):
    answer = 1
    first, second = scores[0]
    my_point = first + second
    
    scores.sort(key=lambda x: (-x[0], x[1]))
    
    cnt = 0
    for i in range(len(scores)):
        if scores[i][0] > first and scores[i][1] > second:
            return -1
        
        if scores[i][1] >= cnt:
            cnt = scores[i][1]
            if scores[i][0] + scores[i][1] > my_point:
                answer += 1
    return answer