/*c eval() код получался раз в 10 короче..но говорят нельзя его использовать */

/*определяем массив, элементы которого являются функциями и возвращают результаты 
математических операций*/

let actions = {
  "+": (a, b) => {
    return parseFloat(a) + parseFloat(b);
  },
  "-": (a, b) => {
    return parseFloat(a) - parseFloat(b);
  },
  "*": (a, b) => {
    return parseFloat(a) * parseFloat(b);
  },
  "/": (a, b) => {
    return parseFloat(a) / parseFloat(b);
  }
};

/*Переменная для хранения строки, которая складывается из введенных значений пользователем*/
let enterString = "";

/*Находим все кнопки, кроме равно, сброс, удалить символ*/ 
let commonsButton = document.getElementsByClassName("common");
/* при нажатии на них будет формировать строка ввода*/  
for (let item of commonsButton) {
  item.onclick = function() { // чтобы невозможно было начать ввод с оператора
    if (
      enterString == "" &&
      (this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/")
    ) {
      return;
    }

    if (
      (enterString.slice(-1) == "+" || // чтобы нельзя было поставить 2 подряд оператора
        enterString.slice(-1) == "=" ||
        enterString.slice(-1) == "*" ||
        enterString.slice(-1) == "/") &&
      (this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/")
    ) {
      return;
    }
    enterString += this.value; // формируем строку
    document.getElementById("displayUser").innerHTML  += this.value; // выводим строку
  };
}

/*Выбираем кнопку равно (=)*/ 
let resultButtom = document.getElementById("result");
resultButtom.onclick = function() { //чтобы нельзя было нажать равно, пока нет знаком мат.операций в строке
  if (
    !enterString.includes("+") &&
    !enterString.includes("-") &&
    !enterString.includes("*") &&
    !enterString.includes("/")
  ) {
    return;
  }

  /*для обеспечения приоритета операций, сначала выбираем в строке эелементы, которые умножаются, считаем результат,
 заменяем в строке эти 2 элемента на результат, и по кругу, пока не кончится такие*/
  findMultOrDiv('*');
  findMultOrDiv('/');//тоже для деления
  findMultOrDiv('+');// тоже для сложения
  findMultOrDiv('-'); // тоже для вычитания
 
  document.getElementById("displayUser").innerHTML  = `${enterString}\n`; // выволим результат 
 // enterString = "";
};

/*Выбираем кнопку очистки поля...тут вроде все банально*/
let resetButtom = document.getElementById("reset");
resetButtom.onclick = () => {
  enterString = "";
  document.getElementById("displayUser").innerHTML  = ``;

};

/*Кнопка удаления последнего введенного символа*/ 
let deleteSymbol = document.getElementById("deleteSymbol");
deleteSymbol.onclick = () => {
  enterString = enterString.slice(0, enterString.length - 1); // укорачиваем строку на 1 символ справа
  document.getElementById("displayUser").innerHTML = enterString;

};

/*Функция для совершения математичских операций,в аргументе передается какую операцию ищем*/ 
function findMultOrDiv(whatToFind){
  /* составляем регулярку для поиска патерном (например: x+y*/ 
  let expr = new RegExp(`\\d+\\.*\\d*\\${whatToFind}\\d+\\.*\\d*`, "g"); 
  do { //пока регулярка что-то находит в нашей строке - выполняем цикл
    let umn = enterString.match(expr);
    if (umn === null) {
      break; //если не удалось найти более вхождений, то прекращаем
    }
    umn.forEach(function(item) { //делим наш найденный шаблон на 2 операнда (операция нам передана)
      let tmp = item.split(`${whatToFind}`);
      let tmpRes = actions[`${whatToFind}`](tmp[0], tmp[1]); //вызываем необходимую операцию и передаем операнды
      enterString = enterString.replace(item, tmpRes); // заменяем в строке операнды и операцию на результат операции
    });
  } while (true);
}
