def solution(diffs, times, limit):
    def get_total_time(level):
        total_time = times[0]  # 첫 번째 퍼즐은 무조건 한 번에 해결
        for i in range(1, len(diffs)):
            if diffs[i] <= level:
                total_time += times[i]
            else:
                retries = diffs[i] - level
                total_time += retries * (times[i] + times[i - 1]) + times[i]
        return total_time

    left, right = 1, max(diffs)
    answer = right

    while left <= right:
        mid = (left + right) // 2
        if get_total_time(mid) <= limit:
            answer = mid
            right = mid - 1
        else:
            left = mid + 1

    return answer
