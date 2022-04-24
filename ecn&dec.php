<?php
function enc($num, $guid = 3)
{
  $old = 0;
  $fib_old = 0;
  $fib = $guid;
  $data = array();
  $i = 0;
  $len = strlen($num);

  while ($i < $len) {
    $fib_old = $fib;
    $fib = $fib + $old;
    $chr = (int)substr($num, $i, 1);
    $data[] = ($chr + $fib) + ($fib * $chr);
    $old = $fib_old;
    $i++;
  }

  return implode("|", $data);
}

function dec($enc, $guid = 3)
{
  $data = explode("|", $enc);
  $cnt = count($data);
  $old = 0;
  $fib_old = 0;
  $numbs = array();

  $i = 0;
  while ($i < $cnt) {
    $fib_old = $guid;
    $guid = $guid + $old;
    $s = (int)$data[$i];
    $numbs[] = ($s - $guid) / (1 + $guid);
    $old = $fib_old;
    $i++;
  }

  return implode("", $numbs);
}