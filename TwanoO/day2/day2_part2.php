<?php
$file = file_get_contents('./input2.txt', true);
$lines = explode("\n",$file);

class Shape {
    public static $matchGain = [
        'Z' => 6, //victory
        'Y' => 3, //draw
        'X' => 0 //loose
    ];

    public string $name;
    public int $gain;
    public Shape $win;

    function __construct($shapeGain) {
        $this->gain = $shapeGain;
    }
    
    public function loose(): Shape {
        return $this->win->win;
    }

    public function match( string $letter ): Shape {
        if( $letter === 'X' ) return $this->win; //I should loose, so the oponent shape should win
        elseif( $letter === 'Y' ) return $this;
        elseif( $letter === 'Z' ) return $this->loose();
    }
}

$A = new Shape(1);
$B = new Shape(2);
$C = new Shape(3);

//shape wins over wich other
$A->win = $C;
$B->win = $A;
$C->win = $B;

$result = array_map(function($line){
    global $shape, $victory, $gain, $A, $B, $C;
    $parts = explode(' ', $line);
    if( strlen($parts[0]) === 0 ) return 0;

    $oponentShape = ${$parts[0]};
    $myShape = $oponentShape->match($parts[1]);

    $count = $myShape->gain + Shape::$matchGain[$parts[1]];
    return $count;
}, $lines);

echo "mon score: \n"; 
echo array_sum($result);
echo "";

