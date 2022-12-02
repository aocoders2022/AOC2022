<?php
$file = file_get_contents('./input2.txt', true);
$lines = explode("\n",$file);


$shape = [
    'X' => 1,
    'Y' => 2,
    'Z' => 3
];

$victory =  [
    'A' => [
        'X' => 3,
        'Y' => 6,
        'Z' => 0
    ],
    'B' => [
        'X' => 0,
        'Y' => 3,
        'Z' => 6
    ],
    'C' => [
        'X' => 6,
        'Y' => 0,
        'Z' => 3
    ]
];

$result = array_map(function($line){
    global $shape, $victory;
    $parts = explode(' ', $line);
    if( strlen($parts[0]) === 0 ) return 0;
    $count = $shape[$parts[1]] + $victory[$parts[0]][$parts[1]];
    return $count;
}, $lines);

echo "mon score: \n"; 
echo array_sum($result);
echo "";

