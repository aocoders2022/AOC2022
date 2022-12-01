<?php
$file = file_get_contents('./input1.txt', true);
$lines = explode("\n",$file);


Class Elf {
    public $calories = [];

    public function totalCalories() {
        return array_sum($this->calories);
    }
}

$elves = [];
$current_elf = new Elf();
$elves[] = $current_elf;

//file parsing steps
foreach($lines as $line){
    if(strlen($line) === 0){
        $current_elf = new Elf();
        $elves[] = $current_elf;
        continue;
    }
    $current_elf->calories[] = intval($line);
}

echo "Nombre d'elfs ". count($elves)."\n";

//found the elf carrying most callories
function compareElvesByTotalCalories(Elf $a, Elf $b)
{
    if ($a->totalCalories() == $b->totalCalories()) {
        return 0;
    }
    return ($a->totalCalories() > $b->totalCalories()) ? -1 : 1;
}
usort($elves, 'compareElvesByTotalCalories');

echo "Nombre de calories max = ".$elves[0]->totalCalories()."\n";

//part two
$top3Total = $elves[0]->totalCalories() + $elves[1]->totalCalories() + $elves[2]->totalCalories();
echo "Nombre de calories du top3 = ".$top3Total."\n";

echo "";

