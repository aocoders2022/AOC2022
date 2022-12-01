def calories():
    with open('input.txt', 'r') as file:
        return [sum(map(int, line.split('\n'))) for line in file.read().strip().split('\n\n')]

def part1():
    return max(calories())

def part2():
    return sum(sorted(calories())[-3:])

print(part1())
print(part2())