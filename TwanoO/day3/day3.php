<?php
$file = file_get_contents('./input3.txt', true);
$lines = explode("\n",$file);

class Rucksack {

    public string $content;
    public string $firstPart;
    public string $secondPart;
    public string $missplaced;

    public function itemMisplaced(): string {
        foreach(str_split($this->firstPart, 1) as $c){
            if( strpos( $this->secondPart, $c ) > -1 ){
                return $c;
            }
        } 
    }

    public function getPriority(): int {
        return strpos("-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", $this->missplaced);
        //return ord($this->missplaced)-97;
    }

    function __construct($content) {
        $this->content = $content;
        $split = str_split($content, strlen($content) / 2 );
        $this->firstPart = $split[0];
        $this->secondPart = $split[1];
        $this->missplaced = $this->itemMisplaced();
    }
}

$result = array_map(function($line){
    if( strlen($line) === 0 ) return 0;
    $ruck = new Rucksack($line);
    return $ruck->getPriority(); 
}, $lines);

echo "mon score: \n"; 
echo array_sum($result);
echo "";

