def input():
    with open('input.txt') as file:
        return file.read().strip().split("\n")

def splitGroup(group):
  return [int(str) for str in group.split('-')] 

def calcRes(callback):
  res = 0
  for line in input():
    [firstGroupStart, firstGroupEnd], [secondGroupStart, secondGroupEnd] = [splitGroup(group) for group in line.split(',')]

    if callback(firstGroupStart, firstGroupEnd, secondGroupStart, secondGroupEnd):
      res += 1
  
  return res

def part1(firstGroupStart, firstGroupEnd, secondGroupStart, secondGroupEnd):
  return firstGroupStart <= secondGroupStart and firstGroupEnd >= secondGroupEnd or firstGroupStart >= secondGroupStart and firstGroupEnd <= secondGroupEnd

def part2(firstGroupStart, firstGroupEnd, secondGroupStart, secondGroupEnd):
  return not (firstGroupEnd < secondGroupStart or firstGroupStart > secondGroupEnd)

print('Part 1:')
print(calcRes(part1))
print('\n')
print('Part 2:')
print(calcRes(part2))