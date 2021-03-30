import time

t = time.localtime()

current_time= time.strftime("%H:%M:%S",t)


print(t)

print(current_time)


check_time = "09:20:30"

print(current_time>check_time)
print(int(current_time[0:2])-int(check_time[0:2]))
