//для секундомера
function Secundomer() {
  //выставляем дату на нуль
  this.date = new Date(0, 0, 0, 0, 0, 0, 0),
    this.interval,
    //ищем кнопки
    this.startButton = document.getElementById("secStart"),
    this.outDiv = document.getElementById("outPutDiv"),
    this.curStamp = 0,
    //навешивам функцию на кнопку старт
    this.startButton.onclick = () => {
      this.start();
    },
    this.stopButton = document.getElementById("secStop"),
    //навешиваем функцию на кнопку стоп
    this.stopButton.onclick = () => {
      this.stop();
    },
    //навешиваем функцию на кнопку сброса
    this.resetButton = document.getElementById("secReset"),
    this.resetButton.onclick = () => {
      this.reset();
    },

    //основная функция, которая прибавляет к нашей дате 100 мс и формирует текст для вывода 
    this.main = () => {
      this.date.setMilliseconds(this.date.getMilliseconds() + 100);
      this.outDiv.innerHTML =
        `${
          //везде проверяем, если число меньше 10, то прибавляем ведущий 0 для вывода
          this.date.getHours() < 10
            ? "0" + this.date.getHours()
            : this.date.getHours()
        }:` +
        `${
          this.date.getMinutes() < 10
            ? "0" + this.date.getMinutes()
            : this.date.getMinutes()
        }:` +
        `${
          this.date.getSeconds() < 10
            ? "0" + this.date.getSeconds()
            : this.date.getSeconds()
        }:` +
        `${this.date.getMilliseconds() / 100}`;
    },

    //запускаем основную функцию с интервалом 100 мс и также отключаем кнопку запуска
    this.start = function() {
      this.interval = setInterval(this.main, 100);
      this.startButton.setAttribute("disabled", "disabled");
    },

    //удаляем интервал и освобождаем кнопку запуска
    this.stop = function() {
      clearInterval(this.interval);
      this.startButton.removeAttribute("disabled");
    },

    //сбрасываем дату, сбрасываем вывод
    this.reset = function() {
      (this.date = new Date(0, 0, 0, 0, 0, 0, 0)),
        (this.outDiv.innerHTML = "00:00:00:0");
    };
}

function Calculator() {
  this.startButton = document.getElementById("exc3Button");
  this.startButton.onclick = () => this.computing();

  this.computing = () => {
    let expression = document.getElementById("expression").value;
    expression = this.findMultOrDiv("*", expression);
    expression = this.findMultOrDiv("/", expression);
    expression = this.findMultOrDiv("+", expression);
    expression = this.findMultOrDiv("-", expression);
    document.getElementById("exc3Result").innerHTML = expression;
  };

  //данная функция писалась к уороку, когда делали калькулятор, просто взял оттуда
  this.findMultOrDiv = function(whatToFind, enterString) {
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
    /* составляем регулярку для поиска патерном (например: x+y*/

    let expr = new RegExp(`\\d+\\.*\\d*\\${whatToFind}\\d+\\.*\\d*`, "g");
    do {
      //пока регулярка что-то находит в нашей строке - выполняем цикл
      let umn = enterString.match(expr);
      if (umn === null) {
        break; //если не удалось найти более вхождений, то прекращаем
      }
      umn.forEach(function(item) {
        //делим наш найденный шаблон на 2 операнда (операция нам передана)
        let tmp = item.split(`${whatToFind}`);
        let tmpRes = actions[`${whatToFind}`](tmp[0], tmp[1]); //вызываем необходимую операцию и передаем операнды
        enterString = enterString.replace(item, tmpRes); // заменяем в строке операнды и операцию на результат операции
      });
    } while (true);
    return enterString;
  };
}

//к задаче про бегущую строку
function RunningString() {
  this.startButton = document.getElementById("exc5Button");
  this.exc5OutputDiv = document.getElementById("exc5OutputDiv");

  this.startButton.onclick = () => {
    let phrase = document.getElementById("exc5Input").value;
    //первый способ = просто добавляем в див с навешенными стилями нашу фразу, далее само крутится
    document.getElementById("spanMarquee").innerHTML = phrase;
    //второй способ - передавем фразу в функцию и там по крутим ее, прибавляя пробелы
    this.run(phrase);
  };

  this.run = function animate(string) {
    let phrase = string;
    setInterval(function() {
      phrase = "&nbsp;" + phrase;
      //если понимаем, что достигли края дива, то фразу сбрасываем на первональную (без пробелов)
      if (phrase.length > exc5OutputDiv.scrollWidth) {
        phrase = string;
      }
      exc5OutputDiv.innerHTML = phrase;
    }, 100); //интервал прокрутки, мс
  };
}

//задание с 3 ссылками
function Refs() {
  this.ref1 = document.getElementById("js1");
  this.ref2 = document.getElementById("js2");
  this.ref3 = document.getElementById("js3");
  //массив для хранения информации об окнах ссылок 
  this.winds = [this.win1, this.win2, this.win3];

  this.ref1.onclick = () => {
    this.openAndClose(this.ref1, "exc4_1.html", "JS1", 0);
  };
  this.ref2.onclick = () => {
    this.openAndClose(this.ref2, "exc4_2.html", "JS2", 1);
  };
  this.ref3.onclick = () => {
    this.openAndClose(this.ref3, "exc4_3.html", "JS3", 2);
  };

  this.openAndClose = (ref, page, name, number) => {
    if (!ref.innerHTML.includes("открыт")) {
      this.winds[number] = window.open(page, name, "width=300px,heigth=300px");
      ref.innerHTML += "(открыт)";
    } else {
      this.winds[number].close();
      ref.innerHTML = ref.innerHTML.replace("(открыт)", "");
    }
  };
}

//к заданию по регуляркам
function regExpInputs() {
  this.emailInput = document.getElementById("emailInput");
  this.emailResults = document.getElementById("emailResults");
  this.fileSelector = document.getElementById("fileSelector");
  this.fileListDiv = document.getElementById("fileList");
  this.fileList = ["1.txt", "image.jpg", "coomon1.dat", "rew.reg"];
  //все написано до нас, поэтому регулярка с https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  this.re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  this.fileList.forEach(item => (this.fileListDiv.innerHTML += `${item}<br>`));

  //навешиваем на кождое изменение в поле ввода емайл, если регулярка соответствует, то показываем, что все ок
  this.emailInput.oninput = () => {
    if (this.re.test(this.emailInput.value)) {
      this.emailResults.classList.remove('notGood');
      this.emailResults.classList.add('good');
      this.emailResults.innerHTML = "соответствует";
    } else {
      this.emailResults.innerHTML = "не соответствует";
      this.emailResults.classList.add('notGood');
      this.emailResults.classList.remove('good');
    }
  };

  //навешиваем на изменения селектора типов файлов, далее составляем регулярку исходя из выбранного и проверяем 
  this.fileSelector.onchange = () => {
    this.fileListDiv.innerHTML = '';
    if (fileSelector.value == "all") {
      this.fileList.forEach(
        item => (this.fileListDiv.innerHTML += `${item}<br>`)
      );
      return;
    }
    let pattern = new RegExp(`.*.${fileSelector.value}`);
    this.fileList.forEach(item => {
      if (pattern.test(item)) {
        this.fileListDiv.innerHTML += `${item}<br>`;
      }
    });
  };
}

//на загрузку документа вызваем все конструкторы, в иницаилизации которых прописана логика
window.onload = () => {
  let cals = new Calculator();
  let secundomer = new Secundomer();
  let runningSting = new RunningString();
  let refs = new Refs();
  let reg = new regExpInputs();
};
