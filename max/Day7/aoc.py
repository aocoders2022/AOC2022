from collections import defaultdict

def input():
    with open('input.txt') as file:
        return parseFile(file)

def parseFile(file):
  with open('input.txt') as f:
        # this is a list of files with their size in a dir
        # ie:
        #   {
        #     'root': { 1234 },
        #     'root/subDir': { 1345, 4567 }
        #    }
        files = defaultdict(list) 
        tree = {}
        path = []

        for line in f.readlines():
            lineParts = line.strip().split(' ')
            currentDir = getPath(path)

            if lineParts[0] == '$':
                if lineParts[1] == 'cd':
                    if lineParts[2] == '..':
                        path.pop()
                    elif lineParts[2] == '/':
                        path.append('')
                    else:
                        tree[currentDir + '/' + lineParts[2]] = currentDir
                        path.append('/' + lineParts[2])
            else:
                if lineParts[0] == 'dir':
                    tree[currentDir + '/' + lineParts[1]] = currentDir
                else:
                    files[currentDir].append((int(lineParts[0])))

        # this is a list of files with their in a dir sizes
        # ie:
        #   {
        #     'root': { 'root/abc','root/def' },
        #     '/abc': { '/abc/ghi', },
        #      ...
        #    }
        fileTree = defaultdict(set)

        for directory in tree:
            fileTree[tree[directory]].add(directory)

  return fileTree, files

def getPath(path): 
  return ''.join(path)

def part1():
  res = 0

  fileTree, files = parseFile(input())

  def search(root):
    currentRes = 0
    for file in fileTree[root]:
        currentRes += search(file)

    for size in files[root]:
        currentRes += size

    if currentRes <= 100000:
        nonlocal res
        res += currentRes

    return currentRes

  search('')
  return res

def part2():
  allFileSizes = {}
  fileTree, files = parseFile(input())

  def search(root):
    currentRes = 0
    for file in fileTree[root]:
        currentRes += search(file)

    for size in files[root]:
        currentRes += size

    allFileSizes[root] = currentRes
    return currentRes

  search('')
  target = 30000000 - (70000000 - allFileSizes[''])
  return min(value for value in allFileSizes.values() if value >= target)

print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())