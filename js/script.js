exc2();
writeDeliter();
exc3();
writeDeliter();
exc4();


function exc2(){
    let a = checkNumber(prompt("Введите число А"));
    let b;
    let result = null;
    
    
    while (true){
        b = checkNumber(prompt("Введите число B(меньшее чем А)"));
        if (a>b){ break;}
        alert(`Число B должно быть меньше А!(${a}>${b})`);
        continue;
    }
    
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

function exc4(){
    let maxFiled=10;
    //str.repeat(count)
    //рисуем квадрат
    writeDeliter();
    for (let i = 0; i < maxFiled-1; i++){
        if (i == 0){
            document.write(`${'*'.repeat(maxFiled-1)}*<br>`); 
            continue;
        }
        document.write(`*${'&nbsp;'.repeat(maxFiled)}*<br>`);
    }
    document.write(`${'*'.repeat(maxFiled-1)}*<br>`); 
    
     //рисуем прямоугольный треугольник
    writeDeliter();
    for (let i = 0; i < maxFiled; i++){
        if (i==0){document.write(`*<br>`); }
        document.write(`*${'&nbsp'.repeat(i)}*<br>`); 
    }
    document.write(`*${'*'.repeat(maxFiled-2)}*<br>`); 

     //рисуем равнобедренный треугольник
    writeDeliter();
    document.write(`${'&nbsp;'.repeat(maxFiled+2)}*<br>`);
    for (let i = maxFiled; i > 0; i--){
       document.write(`${'&nbsp;'.repeat(i)} * ${'&nbsp;'.repeat(maxFiled*2-i*2)}*<br>`);
    }
    document.write(`&nbsp;${'*'.repeat(maxFiled*2-1)}<br>`);

     //рисуем параллепипед
    writeDeliter();
    document.write(`${'&nbsp;'.repeat(maxFiled+3)}*<br>`);
    for (let i = maxFiled; i > 0; i--){
       document.write(`${'&nbsp;'.repeat(i+1)} * ${'&nbsp;'.repeat(maxFiled*2-i*2)}*<br>`);
    }

    for (let i = 0; i < maxFiled+1; i++){
        if (i==0){
            document.write(`${'&nbsp;'.repeat(i+1)} * ${'&nbsp;'.repeat(maxFiled*2-i*2)}*<br>`);
            continue;
        }
        document.write(`${'&nbsp;'.repeat(i+1)} * ${'&nbsp;'.repeat(maxFiled*2-i*2)}*<br>`);
     }
     document.write(`${'&nbsp;'.repeat(maxFiled+3)}*<br>`);
}

//функция для проверки введено ли число
function checkNumber(a){
    if (isNaN(parseInt(a)) && (isNaN(parseFloat(a)))){
        alert("Вы ввели не число. !")
        a = checkNumber(prompt("Введите число:"));
    }
    return parseInt(a);
}

// рисуем разделители между заданиями
function writeDeliter(){
    document.write(`${'='.repeat(30)}<br>`);
    document.write(`<br>`);
}