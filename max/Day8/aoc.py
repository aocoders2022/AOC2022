from collections import defaultdict

def input():
    with open('input.txt') as file:
        return file.read().splitlines()

def forrestMatrix(input):
    rows = list([list(map(int, x)) for x in [list(tree) for tree in input]])
    cols = list(list(zip(*rows)))
    return rows, cols

def getSurroundingTrees(rows, cols, ri, ci):
    right = rows[ri][:ci]
    left = rows[ri][ci+1:]
    up = cols[ci][:ri]
    down = cols[ci][ri+1:]
    
    return {'right': right, 'left': left, 'up': up, 'down': down}

def part1():
    res = 0
    forrestRows, forrestCols = forrestMatrix(input())
    
    for ri, row in enumerate(forrestRows):
        for ci, col in enumerate(row):
            currentHeight = col
            surroundingTrees = getSurroundingTrees(forrestRows, forrestCols, ri, ci)
            try:
                if any(max(x) < currentHeight for x in surroundingTrees.values()):
                    res += 1
            except ValueError: # handles border cases because some values are null yet the rules tell us to count it
                res += 1
                continue

    return res

def processDistance(height, heights): 
    distance = 0
    
    for h in heights:
        distance += 1
        if h >= height:
            break

    return distance

def part2():
    res = 0
    forrestRows, forrestCols = forrestMatrix(input())

    for ri, row in enumerate(forrestRows):
        for ci, col in enumerate(row):
            currentHeight = col
            surroundingTrees = getSurroundingTrees(forrestRows, forrestCols, ri, ci)

            distanceToRight = processDistance(currentHeight, reversed(surroundingTrees['right']))
            distanceToLeft = processDistance(currentHeight, surroundingTrees['left'])
            distanceToTop = processDistance(currentHeight, reversed(surroundingTrees['up']))
            distanceToDown = processDistance(currentHeight, surroundingTrees['down'])

            totalDistance = distanceToRight * distanceToLeft * distanceToTop * distanceToDown
            if totalDistance:
                res = max(totalDistance, res)

    return res

print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())