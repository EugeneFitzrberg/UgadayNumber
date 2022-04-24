<?php

include_once('./ecn&dec.php');
$request = json_decode(file_get_contents('php://input'), true);

$result = [
  'number' => (int)$request['number'],
  'hidden_number' => $request['hidden_number'],
  'count_attempt' => $request['count_attempt'],
  'maxNum' => (int)$request['max_number'],
  'minNum' => (int)$request['min_number'],
  'game_over' => $request['game_over'],
  'message' => ''
];

$result['hidden_number'] = (int)dec($result['hidden_number']);

$value_as_str = strval($result['number']);
$len = strlen($value_as_str);

if ($result['count_attempt'] > 1 or $result['number'] === $result['hidden_number']) {
  if ($value_as_str != 0) {
    if ($result['number'] <= $result['maxNum'] and $result['number'] >= $result['minNum']) {
      if ($result['number'] > $result['hidden_number']) {
        $result['message'] = 'Загаданное значение меньше ' . $result['number'] . '. Осталось ' . ($result['count_attempt'] - 1) . ' попыток.';
        $result['count_attempt']--;
      } else if ($result['number'] < $result['hidden_number']) {
        $result['message'] = 'Загаданное значение больше ' . $result['number'] . '. Осталось ' . ($result['count_attempt'] - 1) . ' попыток.';
        $result['count_attempt']--;
      } else {
        $result['message'] = 'Ура! Вы угадали.';
        $result['game_over'] = true;
      }
    } else
      $result['message'] = 'Вы вышли за диапазон допустимых значений от ' . $result['minNum'] . ' до ' . $result['maxNum'];
  } else
    $result['message'] = 'Вы не ввели значение.';
} else {
  $result['game_over'] = true;
  $result['message'] = 'Вы не угадали загаданное число ' . $result['hidden_number'];
}

$result['hidden_number'] = enc((int)$result['hidden_number']);

echo json_encode($result);