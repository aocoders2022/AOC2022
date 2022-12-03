# Part 1:
# Make a matrix score for each pair
# Count how many pairs are the same
# Addition the pairs 

score_matrix = {
    'AX': 4,
    'AY': 8,
    'AZ': 3,
    'BX': 1,
    'BY': 5,
    'BZ': 9,
    'CX': 7,
    'CY': 2,
    'CZ': 6,
}

def input():
    with open('input.txt') as file:
        return [line.replace(" ", "") for line in file.read().strip().split("\n")]

def part1():
    return sum([score_matrix[game] for game in input()])

# Part 2: 
# Make a matrix score for each expected score
# Calculs are the same as above, but X is always lose, Y is always draw, Z is always win
# Count how many pairs are the same
# Addition the pairs 

cheat_score_matrix = {
    'AX': 3,
    'AY': 4,
    'AZ': 8,
    'BX': 1,
    'BY': 5,
    'BZ': 9,
    'CX': 2,
    'CY': 6,
    'CZ': 7,
}

def part2():
    return sum([cheat_score_matrix[game] for game in input()])

print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())