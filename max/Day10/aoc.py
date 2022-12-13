def input():
    with open('input.txt') as file:
        return [line.strip().split(' ') for line in file.readlines()]

def computeSignalStrengths():
    X = 1
    cycles = 0
    strength = {}

    for line in input():        
        if line[0] == "noop":
            cycles += 1
            strength[cycles] = X * cycles
            
        else:
            if line[0] == "addx":
                cycles += 1
                strength[cycles] = X * cycles
                
                cycles += 1
                strength[cycles] = X * cycles
                X += int(line[1])

    return strength

def part1():
    return sum(computeSignalStrengths().get(i) for i in range(20, 221, 40))


def updatePixels(X, cycles, pixels):
	pos = (cycles - 1) % 40
	if pos in {X-1, X, X+1}:
		pixels[cycles - 1] = "#"

def computePixels():
    X = 1
    cycles = 0
    pixels = list("." * 40 * 6)

    for line in input():        
        if line[0] == "noop":
            cycles += 1
            updatePixels(X, cycles, pixels)
            
        else:
            if line[0] == "addx":
                cycles += 1
                updatePixels(X, cycles, pixels)
                
                cycles += 1
                updatePixels(X, cycles, pixels)
                X += int(line[1])

    return pixels

def part2():
    pixels = computePixels()

    for i in range(0, 201, 40):
	    print("".join(pixels[i: i + 40]))


print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())