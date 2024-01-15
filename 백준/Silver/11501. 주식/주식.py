T = int(input())

for _ in range(T):
    day = int(input())
    price = list(map(int, input().split()))
    profit = 0

    max_price = 0
    for i in range(day-1, -1, -1):
        if price[i] > max_price:
            max_price = price[i]
        else:
            profit += max_price - price[i]
    print(profit)