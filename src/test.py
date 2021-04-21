import sys

def add(a, b): 
    result = a + b 
    print(result)
    return result

add(int(sys.argv[1]), int(sys.argv[2]))