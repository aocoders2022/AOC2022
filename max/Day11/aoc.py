import operator
import functools

operations = {
    '+' : operator.add,
    '*' : operator.mul,
}


def input():
    with open('input.txt') as file:
        return [parseMonkey(monkeytxt) for monkeytxt in file.read().split('\n\n')]
            
def parseMonkey(monkeytxt):
    lines = [line.strip() for line in monkeytxt.splitlines()]
    (_, levelsTxt,
        operationTxt, divisorTxt,
        ifTrueTxt, ifFalseTxt) = lines

    levelsTxt = levelsTxt.split(': ')[1].strip()
    levels = [int(level) for level in levelsTxt.split(', ')]
    operation = operationTxt.split('=')[1].strip().split(' ')
    divisor = int(divisorTxt.split(' ')[-1])
    ifTrue = int(ifTrueTxt.split(' ')[-1])
    ifFalse = int(ifFalseTxt.split(' ')[-1])

    return {
        'levels': levels,
        'operation': operation,
        'divisor': divisor,
        'ifTrue': ifTrue,
        'ifFalse': ifFalse,
        'inspected': 0,
    }

def playRound(monkeys, rounds, worryDivisor = None):
    monkeysCount = len(monkeys)

    if(not worryDivisor):
        commonDivisor = functools.reduce(lambda cd, x: cd * x, (m['divisor'] for m in monkeys))

    for _ in range(rounds):
        for monkeyId in range(monkeysCount):
            monkey = monkeys[monkeyId]
            for level in monkey['levels']:
                monkey['inspected'] += 1
                currentlevel = processMonkeyLevel(monkey['operation'], level)

                if(worryDivisor):
                    currentlevel = currentlevel // worryDivisor
                elif(commonDivisor):
                    currentlevel = currentlevel % commonDivisor

                toId = (
                    monkey['ifTrue']
                    if currentlevel % monkey['divisor'] == 0 
                    else monkey['ifFalse']
                )
                monkeys[toId]['levels'].append(currentlevel)
       
            monkey['levels'] = list()

def parseMonkeyOperationValue(val, level):
    return level if val == 'old' else int(val)

def processMonkeyLevel(operation, level):
    first = parseMonkeyOperationValue(operation[0], level)
    second = parseMonkeyOperationValue(operation[2], level)
    return operations[operation[1]](first, second)

def part1():
    monkeys = input()
    playRound(monkeys, 20, 3)
    inspected = sorted([m['inspected'] for m in monkeys], reverse=True)
    return inspected[0] * inspected[1]

def part2():
    monkeys = input()
    playRound(monkeys, 10000)
    inspected = sorted([m['inspected'] for m in monkeys], reverse=True)
    return inspected[0] * inspected[1]

print('Part 1:')
print(part1())
print('\n')
print('Part 2:')
print(part2())