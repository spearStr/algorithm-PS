def solution(targets):
    # 끝 지점을 기준으로 오름차순 정렬
    targets.sort(key=lambda x: x[1])
    
    answer = 0
    last_shot = -1  # 마지막 요격한 시점 (미사일의 s 이상, e 미만에 들어가야 함)
    
    for start, end in targets:
        # 이전 요격 지점으로는 막을 수 없는 경우 → 새로 쏴야 함
        if last_shot < start:
            answer += 1
            last_shot = end - 1  # [s, e) 이므로, e 직전 지점에 쏘는 게 가장 유리함
            
    return answer
