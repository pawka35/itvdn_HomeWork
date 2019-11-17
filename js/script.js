//для секундомера
function Secundomer() {
  (this.date = new Date(0, 0, 0, 0, 0, 0, 0)),
    this.interval,
    (this.startButton = document.getElementById("secStart")),
    (this.outDiv = document.getElementById("outPutDiv")),
    (this.curStamp = 0),
    (this.startButton.onclick = () => {
      this.start();
    }),
    (this.stopButton = document.getElementById("secStop")),
    (this.stopButton.onclick = () => {
      this.stop();
    }),
    (this.resetButton = document.getElementById("secReset")),
    (this.resetButton.onclick = () => {
      this.reset();
    }),
    (this.main = () => {
      this.date.setMilliseconds(this.date.getMilliseconds() + 100);
      this.outDiv.innerHTML =
        `${
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
    }),
    (this.start = function() {
      this.interval = setInterval(this.main, 100);
      this.startButton.setAttribute("disabled", "disabled");
    }),
    (this.stop = function() {
      clearInterval(this.interval);
      this.startButton.removeAttribute("disabled");
    }),
    (this.reset = function() {
      (this.date = new Date(0, 0, 0, 0, 0, 0, 0)),
        (this.outDiv.innerHTML = "00:00:00:0");
    });
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

function RunningString(){
  this.startButton = document.getElementById('exc5Button');
  this.exc5OutputDiv = document.getElementById('exc5OutputDiv');
  this.startButton.onclick = ()=>{
    let phrase = document.getElementById('exc5Input').value;
    document.getElementById('spanMarquee').innerHTML = phrase;
    this.run(phrase);
  };

  this.run = function animate(string) {
    let phrase = string;
    setInterval(function () {
      phrase = '&nbsp;'+phrase;
      if(phrase.length > exc5OutputDiv.scrollWidth){
        phrase =  string;
      }
      exc5OutputDiv.innerHTML = phrase;
    }, 100); //интервал прокрутки, мс
   }

}


window.onload = () => {
  let cals = new Calculator();
  let secundomer = new Secundomer();
  let runningSting = new RunningString();
};
