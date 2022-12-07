<?php
$file = file_get_contents('./input3.txt', true);
$lines = explode("\n",$file);


//prepare the groups
$groups = [];
foreach($lines as $index => $line ){
    if(strlen($line) === 0) continue ;
    $groupnum = intdiv($index, 3);
    $elfpos = ($index % 3); //modulo
    if( !isset($groups[$groupnum]))
        $groups[$groupnum] = [];
    $groups[$groupnum][$elfpos] = $line;
}

function findBadge($group): string {
    foreach( str_split($group[0]) as $c ){
        if( strpos($group[1], $c) > -1 && strpos($group[2], $c) > -1 ){
            return $c;
        }
    }
}

$result = array_map(function($group){
    $badge = findBadge($group);
    return strpos("-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", $badge);
}, $groups);

echo "mon score: \n"; 
echo array_sum($result);
echo "";

