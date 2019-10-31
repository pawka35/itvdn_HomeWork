exc2();
exc3();

function exc2() {
    //запращиваем размерность массива
  let size = enterNumber();

    //создаем массив размерностью N элементов, и заполнияем его произвольными целыми значениями
  let arr = arrayFilling(size);
  document.write('Исходный массив: ');
  arr.map((item)=>(document.write(`[${item}]&nbsp;`)));
  document.write('<br><br>')

  let max = -101; 
  let min = 101; 
  
  //ище наибольшее и наименьшее значение массива
  arr.forEach(function(item) {
    if (item > max) {
        max = item;
    }
    if (item < min) {
        min = item;
      }
    
  });

  document.write(`Максимальный элемент массива: ${max} (место ${arr.indexOf(max)+1})</br>`);
  document.write(`Минимальный элемент массива: ${min} (место ${arr.indexOf(min)+1})</br>`);

  //находим общую сумму элементов
  let sum = 0;
  arr.map(item => (sum += item));
  document.write(`Общая сумма элементов: ${sum}</br>`);

  //находим среднее арифметическое всех элементов
  let srSum = 0;
  let counter = 0;
  arr.map(function(item) {
    counter++;
    srSum = (srSum += item) / counter;
  });
  document.write(`Среднее арифметическое всех элементов: ${srSum}</br>`);


  let sumCh = 0;
  //выводим все нечетные значения
  let oddNumbers = arr.filter(item => item % 2 == 1);
  document.write(`Все нечетные значения: ${oddNumbers.join(';&nbsp')}</br>`);
  document.write('<br><br>')

};

function exc3() {
//создаем двумерный массив элементов размерностью 5х5 и заполняем его произвольными целочисленными значениями
  let arr = [];
  document.write("Исходный двумерный массив 5х5: <br><pre>");
  for (i = 0; i < 5; i++) {
    let tmpArr = [];
    for (j = 0; j < 5; j++) {
      tmpArr.push(Math.floor(Math.random() * (100 - -100 + 1) - 100));
    }
    arr[i] = tmpArr;
    document.write(arr[i].join("&#9;") + "</br>");
  }
  document.write("</pre>");

  //По главной диагонали('элементы [1][1],[2][2] и т.п) все числа со знаком (-) 
  //замеяем на 0, а числа сознаком (+) на число 1
  for (let i = 0; i < 5; i++) {
    if (arr[i][i] < 0) {
      arr[i][i] = 0;
    } else {
      arr[i][i] = 1;
    }
  }

  document.write("</br>");
  document.write("Измененный двумерный массив 5х5: <br><pre>");
  arr.map(item => {
    document.write(`${item.join("&#9;")}</br>`);
  });
  document.write("</pre>");
}

//функция для пользовательского ввода и проверки, что ввели число
function enterNumber() {
  let b = null;
  while (true) {
    b = prompt("Введите размерность массива:");
    if (parseFloat(b) % 1 == 0 && parseFloat(b) > 0) {
      break;
    } else {
      alert("Необходимо ввести целое положительное число!");
    }
  }
  return b;
}

//функция для заполнения массива, указанной размерности целыми числами в диапазоне от -100 до 100
function arrayFilling(size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    result[i] = Math.floor(Math.random() * (100 - -100 + 1) - 100);
  }
  return result;
}
