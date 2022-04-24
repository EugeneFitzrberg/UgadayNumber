window.onload = start();

var first;
var second;
var guessCount;

var guessBtn;
var guesses;
var resetBtn;

var tryCount;
var randomNumber;

var text;
var item;
var rule;


function start(){
    first = 1;
    second = 100;

    text = document.getElementById("text");
    guessBtn = document.getElementById("guessBtn");
    resetBtn = document.getElementById("resetBtn");
    rule = document.getElementsByClassName("rule");
    guesses = document.getElementsByClassName("guesses");
    document.getElementById("textField").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            check();
        }
    });
    rule[0].innerHTML += "Диапазон от " +first + " до "+ second + ".";
    rule[0].innerHTML += " Количество попыток " + Math.ceil(Math.log2(second - first +1));
    refrator();
}
function refrator() {

    guesses[0].innerHTML = "------";
    guessBtn.classList.remove("disabled");
    document.getElementById("textField").classList.remove("disabled");
    guessCount = 0;
    randomNumber = Math.floor(Math.random() * second) + first;
    tryCount = Math.ceil(Math.log2(second - first +1));
   
    text.innerHTML = "Новая игра! Введите первое число! ";
    document.getElementById("textField").focus();
    document.getElementById("textField").value = null;
}


function check() {
    
    item = document.getElementById("textField").value;
    
    // console.log(sum);
    if (tryCount > 0) {
        if (item >= Number(first) && item <= Number(second)) {
            if(item > randomNumber)
            {
                text.innerHTML = "Загаданное число меньше " + item;
            }
            else{
                text.innerHTML = "Загаданное число больше " + item;
            }
            console.log(item);
            console.log(randomNumber);
            tryCount --;
            if (item == randomNumber) {
                text.innerHTML = "Поздравляю" ;
                guesses[0].innerHTML = "Вы угадали число " + Number(randomNumber);
                setGameOver();
                return;
            }
            else {
                if (guessCount == 0) {
                    guesses[0].innerHTML = "Предыдущие попытки " + ": ";
                }
                guesses[0].innerHTML += Number(item) + " ";
                guessCount++;
                
            }
        }
        else {
            text.innerHTML = "Число некорректно, попробуйте еще раз! ";
          
        }
        if(tryCount == 0) {
            text.innerHTML = "Попытки закончились";
            guesses[0].innerHTML = "Задуманное число :" + Number(randomNumber);
            setGameOver();
        }
    }
    // text.innerHTML = "У вас есть еще попытки: " + Number(sum +1);
    document.getElementById("textField").value = null;
}

function setGameOver() {
    let textField =  document.getElementById("textField"); 
    textField.classList.add("disabled");
    textField.blur();
    document.getElementById("textField").value = null;
    // document.getElementById("textField").blur();
    guessBtn.classList.add("disabled");
    resetBtn.focus();
}



