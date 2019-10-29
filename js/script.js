//exc2();
exc3();


function exc2(){
    let a = checkNumber(prompt("Введите число А"));
    let b;
    let result = null;
    do{
    b = checkNumber(prompt("Введите число B(меньшее чем А)"));
    if (a<b){alert(`Число B должно быть меньше А!(${a}>${b})`)}
    }
    while (a<b)
    a = Math.trunc(a), b = Math.trunc(b); //отбрасываем дробные части (по условию задачи)
    console.log(a);console.log(b);
    for (let i=b; i<a; i++)
    {
        console.log(i);
        if (i % 2 == 0){
            result += i;
        }

    }
    document.write(`Задача 2 <br>`)
    document.write(`Сумма всех четных чисел от ${a} до ${b} равна ${result} <br>`)
}

function exc3(){
 let b = null;
    while(true){
        b = prompt("Введите основание факториала");
        if (parseFloat(b) % 1 == 0  && parseFloat(b) > 0){
            break;
        }
        else{
            alert("Необходимо ввести целое положительное число!");
        }
    }
    
    let result = b;
    let forOtvet = b;

    if (result == 0 || result == 1) {
        result =  1;
    }
    else{
        do {
            result = result * (b - 1);
            b--; 
          }
          while (b > 1);
    }
    document.write(`<br>Задача 3 <br>`)
    document.write(`Факториал числа ${forOtvet} равен ${result}`)
}

function checkNumber(a){
    if (isNaN(parseInt(a)) && (isNaN(parseFloat(a)))){
        alert("Вы ввели не число. !")
        a = checkNumber(prompt("Введите число:"));
    }
    return a;
}