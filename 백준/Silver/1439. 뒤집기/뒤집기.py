number = input()
number_len = len(number)

zero, one = 0, 0
zero_flag, one_flag = False, False

for i in range(number_len):
    if number[i] == '0' and zero_flag == False:
        zero += 1
        zero_flag = True
        one_flag = False
    elif number[i] == '1' and one_flag == False:
        one += 1
        one_flag = True
        zero_flag = False

print(min(zero, one))