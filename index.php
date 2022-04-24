<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="css/style.css">

    <title>Угадай число</title>
</head>
<body>
<div class="container">
    <h1 class="title">Угадай число</h1>

    <div class="section">
        <h4>Правила</h4>
        <p class="rules" id="rules" disabled></p>
    </div>

    <form action="check.php"  >
        <input type="number" name="number" autofocus>
        <button type="submit" class="btn">Проверить</button>

        <input type="text" name="hidden-number"
               style="display: none; position: absolute; top: -100%;">
        <input type="text" name="count-attempt"
               style="display: none; position: absolute; top: -100%;">
        <input type="number" name="max-number"
               style="display: none; position: absolute; top: -100%;">
        <input type="number" name="min-number"
               style="display: none; position: absolute; top: -100%;">
    </form>

    
    <p class="input-rez" disabled>Место для сообщений</p>
    

</div>

<script src="js/script.js"></script>
</body>
</html>