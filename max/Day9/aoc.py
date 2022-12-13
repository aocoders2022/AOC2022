from collections import defaultdict

def input():
    with open('input.txt') as file:
        return [line.strip().split(' ') for line in file.readlines()]

def getNewVector(direction):
    match direction:
        case 'L':
            return [-1, 0]
        case 'U':
            return [0, 1]
        case 'R':
            return [1, 0]
        case 'D':
            return [0, -1]

def processTail(head, tail):
    headMovesVectors = [x - y for x, y in zip(head, tail)]  

    if abs(headMovesVectors[0]) > 1 or abs(headMovesVectors[1]) > 1:
       tail[:] = [originalHeadPosition + (1 if moveVector >= 1 else -1 if moveVector <= -1 else 0) for originalHeadPosition, moveVector in zip(tail, headMovesVectors)]

def part1():
    head = [0, 0]
    tail = [0, 0]
    visited = set()

    for direction, amount in input():
        for _ in range(int(amount)):
            head = [x + y for x, y in zip(head, getNewVector(direction))]
            
            processTail(head, tail)

            visited.add(tuple(tail))

    return len(visited)

def part2():
    head = [0, 0]
    tail = [0, 0]
    tailParts = [[0, 0] for _ in range(9)]
    visited = set()

    for direction, amount in input():
        for _ in range(int(amount)):
            head = [x + y for x, y in zip(head, getNewVector(direction))]
            
            processTail(head, tail)
            for i in range(len(tailParts)):
                processTail(head if i == 0 else tailParts[i - 1], tailParts[i])

            if i == 8:
                visited.add(tuple(tailParts[i]))
    return len(visited)


print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())