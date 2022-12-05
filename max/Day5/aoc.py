def parseStacks(stacks):
  parsedStacks = [''] * 10
  for line in stacks[:-1]:
    for i, content in enumerate(line[1::4]):
      if content != " ":
        parsedStacks[i+1] += content

  return parsedStacks

def parseMoves(moves):
  return [[int(n) for n in m if n.isnumeric()] for m in [l.split() for l in moves]]

def input():
    with open('input.txt') as file:
        stacks, moves = [line.split('\n') for line in file.read().split("\n\n")]
        return parseStacks(stacks), parseMoves(moves)

def part1():
  stacks, movesList = input()
  orderedStacks = stacks[:]
  for [n, src, dest] in movesList:
    orderedStacks[src], orderedStacks[dest] = orderedStacks[src][n:], orderedStacks[src][:n][::-1] + orderedStacks[dest]    
  return ''.join(content[0] for content in orderedStacks if content)

def part2():
  stacks, movesList = input()
  orderedStacks = stacks[:]

  for [n, src, dest] in movesList:
    orderedStacks[src], orderedStacks[dest] = orderedStacks[src][n:], orderedStacks[src][:n] + orderedStacks[dest]      
  return ''.join(content[0] for content in orderedStacks if content)

print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())