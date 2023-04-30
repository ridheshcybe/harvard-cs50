w = int(input("Weight: "))
unit = input("(K)g or (L)bs: ")
if unit.lower() == "k":
    converted = w / 0.45
else:
    converted = w * 0.45
print(converted)
