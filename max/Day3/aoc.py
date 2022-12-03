def input():
    with open('input.txt') as file:
        return file.read().strip().split("\n")

def charPower(letter):
  # """ 
  #   Returns char position in the alphabet using Ascii position
  #   @link {https://stackoverflow.com/a/5927403} + Uppercases
  # """
    if letter.isupper():
        return ord(letter) - 38 
    else:
        return ord(letter) - 96 

def checkRumstack(rumstack):
  middle = len(rumstack) // 2
  pt1, pt2 = set(rumstack[:middle]), set(rumstack[middle:])
  commonChars = pt1 & pt2
  return sum(charPower(char) for char in commonChars)

# Checks the difference bet
def part1():
  return sum(checkRumstack(rumstack) for rumstack in input())

def checkRumstackGroup(group):
  rumstacks = [set(rumstack) for rumstack in group]
  duplicatedChars = rumstacks[0] # at first we assume all the first rumstack content will be duplicated
  for rumstack in rumstacks[1:]:
    duplicatedChars &= rumstack # &= is the IAND operator, it's equivalent to 
  
  return charPower(list(duplicatedChars)[0])

def part2():
  badges = 0
  toCheckList = []
  for rumstack in input():
    toCheckList.append(rumstack)

    if(len(toCheckList) >= 3):
      badges += checkRumstackGroup(toCheckList)
      toCheckList.clear()
  
  return badges


  return 0

print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())