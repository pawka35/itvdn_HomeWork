ex2();
ex3();
ex4()

function ex2(){
    document.write(`Задача 2:<br>`)
    let x= 6;
    let y = 15;
    let z=4;
    document.write(`<br>Дано:<br>x = ${x}<br>y=${y}<br>z=${z}<br>Решение:`)
    x+=y-x++*z;
    z=--x-y*5;
    y/=x+5%z;
    x=y-x++*z;

    document.write(`<br>x+=y-x++*z = ${x}`);
    document.write(`<br> z=--x-y*5 = ${z}`);
    document.write(`<br>y/=x+5%z = ${y}`);
    document.write(`<br>x=y-x++*z = ${x}`);
};

function ex3(){
    alert("Будем вычислять среднее арифм. 3 целочисленных значений.");
    a = tryParseToInt( prompt("Введите число A"),"int");
    b = tryParseToInt( prompt("Введите число B"),"int");
    c = tryParseToInt( prompt("Введите число C"),"int");
    document.write(`<br><hr><br> Задача 3:<br>`)
    document.write(`<br>Дано:<br>a = ${a}<br>b=${b}<br>c=${c}<br>Решение:`)

    result = (a+b+c)/3;
    document.write(`<br>(${a}+${b}+${c})/3=${result}<br>`);
};

function ex4(){
    alert("Теперь будем вычислять объем и площат поверхности цилиндра");
    r = tryParseToInt( prompt("Введите радиус"),"float");
    h = tryParseToInt( prompt("Введите высоту"),"float");
    V = Math.PI*h*(r**2);
    S = 2*Math.PI*r*(r+h);
    document.write(`<br><hr><br>Задача 4:<br>`)
    document.write(`<br>Дано:<br>r = ${r}<br>h=${h}<br>Решение:`)
    document.write(`<br>Объем цилиндра равен: Pi&#215;${h}&#215;r<sup>2</sup>=${V}`);
    document.write(`<br>Площадь поверхности цилиндра: 2&#215;Pi&#215;${r}&#215;(${r}+${h})=${S})`);
    
}


function tryParseToInt(a, method){
    if (method=="int"){
        a=parseInt(a);}
    else if(method=="float"){
        a = parseFloat(a);
    }

    if (isNaN(a))
    {
        alert("Необходимо ввести число")
        if (method=="int"){
            a = tryParseToInt(prompt("Введите число:"),"int")}
        else{
            a = tryParseToInt(prompt("Введите число:"),"float")}
    }

    return a;
}