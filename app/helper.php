<?php
    if (!defined("_ALORESAL_")) {exit;}

include('plugin/color.php');

function dump(){
	$string = '';
	foreach(func_get_args() as $value){
		$string .= '<pre>' . ($value === NULL ? 'NULL' : (is_scalar($value) ? $value : print_r($value, TRUE))) . "</pre>\n";
	}
echo $string;
}
