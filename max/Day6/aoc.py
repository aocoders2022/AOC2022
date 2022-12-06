def input():
    with open('input.txt') as file:
        return file.read()

def part1():
  res = 0
  signal = input()
  for i in range(4, len(signal)):
    s = signal[i-4:i]
    if len(set(s)) == 4:
      res = i
      break
  return res

def part2():
  res = 0
  signal = input()
  for i in range(14, len(signal)):
    s = signal[i-14:i]
    if len(set(s)) == 14:
      res = i
      break
  return res

print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())