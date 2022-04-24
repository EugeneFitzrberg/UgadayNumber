window.addEventListener('DOMContentLoaded', () => {

    function enc(num, guid = 3) {
        let old = 0;
        let fib_old = 0;
        let data = [];
        let i = 0;
        num = String(num);
        let len = num.length;
        let chr = num.split('');

        while (i < len) {
            fib_old = guid;
            guid = guid + old;
            data.push((+chr[i] + guid) + (guid * +chr[i]));
            old = fib_old;
            i++;
        }

        return data.join('|');
    }

    function dec(enc, guid = 3) {
        let data = enc.split("|");
        let cnt = data.length;
        let old = 0;
        let fib_old = 0;
        let numbs = [];

        let i = 0;
        while (i < cnt) {
            fib_old = guid;
            guid = guid + old;
            let s = +data[i];
            numbs.push((s - guid) / (1 + guid));
            old = fib_old;
            i++;
        }

        return numbs.join("");
    }

    const container = document.querySelector('.container');

    const minNum = 1;
    const maxNum = 100;
    let num = Math.trunc(Math.random() * (maxNum - minNum) + minNum);
    let attempts = Math.ceil(Math.log2(maxNum - minNum + 1));

    num = enc(num);

    document.querySelector('input[name="hidden-number"]').value = num;
    document.querySelector('input[name="count-attempt"]').value = attempts;
    document.querySelector('input[name="max-number"]').value = maxNum;
    document.querySelector('input[name="min-number"]').value = minNum;

    document.querySelector('.rules').innerHTML = `Вам загадано число в диапазоне от ${minNum} до ${maxNum}. 
                                                    Ваша задача будет отгадать это число за ${attempts} попыток.`;

    document.forms[0].addEventListener('submit', (e) => {
        e.preventDefault();

        if (!container.classList.contains('game_over')) {
            const responeURL = "../check.php";
            let body = {
                'number': document.querySelector('input[name="number"]').value,
                'hidden_number': document.querySelector('input[name="hidden-number"]').value,
                'count_attempt': document.querySelector('input[name="count-attempt"]').value,
                'max_number': document.querySelector('input[name="max-number"]').value,
                'min_number': document.querySelector('input[name="min-number"]').value,
                'game_over': false
            };
            
            let xhr = new XMLHttpRequest();
            xhr.open('POST', responeURL);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let serverResponse = JSON.parse(xhr.responseText);

                    body['hidden_number'] = dec(serverResponse['hidden_number'])
                    document.querySelector('.input-rez').innerText = serverResponse['message'];
                    document.querySelector('input[name="count-attempt"]').value = serverResponse['count_attempt'];
                    document.querySelector('input[name="hidden-number"]').value = serverResponse['hidden_number'];

                    if (serverResponse['game_over']) {
                        container.classList.add('game_over');
                        document.querySelector('.btn').focus();
                        document.querySelector('.btn').innerHTML = 'Начать заново';
                    }
                }
            }

            xhr.send(JSON.stringify(body));

            document.querySelector('input[name="number"]').value = '';
        } else
            window.location.reload()
    });
});
