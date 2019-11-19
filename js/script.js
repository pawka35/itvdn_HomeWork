function getElem(id) {
  return document.getElementById(id);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

function Exc1() {
  this.tryCount = 0;
  this.resDiv = getElem("exc-1_resultDiv");
  this.RndNumber = randomInteger(0, 100);
  this.btn = getElem("exc-1_button");
  getElem("testDiv").innerHTML =`Мы типа этого не видим: ${this.RndNumber}`;
  this.btn.onclick = () => {
    getElem("tryCount").innerHTML = `Совершенно попыток: ${++this.tryCount}`;
    let userNumb = getElem("exc-1_input");
    if (userNumb.value == this.RndNumber) {
      this.resDiv.className = "goodResult";
      this.resDiv.innerHTML = `Вы угадали число ${this.RndNumber}.`;
      this.btn.disabled = true;
    } else {
      this.resDiv.innerHTML =
        userNumb.value > this.RndNumber
          ? "Загаданное число меньше введенного вами"
          : "Загаданное число больше введенного вами";
      this.resDiv.className = "badResult";
    }
  };
}

function exc3() {
  let parrent = getElem("exc3-container");
  let elements = [...document.getElementsByClassName("exc3-el")];
  elements.forEach(item => move(item));

  function move(item) {
    setInterval(() => {
      let ofsX = randomInteger(0, parrent.clientWidth - 50) + "px";
      let ofsY = randomInteger(0, parrent.clientHeight - 50) + "px";
      item.style.left = ofsX;
      item.style.top = ofsY;
    }, 1000);
  }
}

function exc4() {
  let element = getElem("exc4-text");
  let parrent = getElem("exc-4_textContainer");

  let directions = {
    up: getElem("exc4-up"),
    down: getElem("exc4-down"),
    left: getElem("exc4-left"),
    right: getElem("exc4-right")
  };

  for (let el in directions) {
    directions[el].onclick = () => {
      move(el);
    };
  }

  function move(item) {
    let counter = 0;
    let interval = setInterval(() => {
      if (counter == 100) {
        clearInterval(interval);
      }
      switch (item) {
        case "right":
          if (
            element.offsetLeft >
            parrent.clientWidth + parrent.offsetLeft - 30
          ) {
            break;
          }
          element.style.right =
            parseInt(window.getComputedStyle(element, null)["right"]) -
            1 +
            "px";
          break;
        case "left":
          if (element.offsetLeft < parrent.offsetLeft ) {
            break;
          }
          element.style.right =
            parseInt(window.getComputedStyle(element, null)["right"]) +
            1 +
            "px";
          break;
        case "down":
          if (
            element.offsetTop >
            parrent.clientHeight + parrent.offsetTop - 30
          ) {
            break;
          }
          element.style.top =
            parseInt(window.getComputedStyle(element, null)["top"]) + 1 + "px";
          break;
        case "up":
          if (element.offsetTop < parrent.offsetTop) {
            break;
          }
          element.style.top =
            parseInt(window.getComputedStyle(element, null)["top"]) - 1 + "px";
          break;
      }
      counter++;
    }, 10);
  }
}

function exc2() {
  getElem("ecx2_btn").onclick = () => {
    window.open(
      "exc2.html",
      "Авторизация",
      "width=600px,heigth=600px, location=no"
    );
  };
}

function help() {
  let desc = {
    excDescription1: `Разработайте игру «Угадай значение». Страница загадывает число от 1 до 100. Пользователь в поле ввода 
    вводит значение пытаясь угадать загаданное число. Если пользователь не угадывает значение, страница
    выводит сообщение с текстом «загаданное значение больше введенного вами» или «загаданное
    значение меньше введенного вами». Подумайте, как можно применить DHTML в таком приложении`,
    excDescription2: `Создайте страницу для авторизации. На странице должны находиться поля вводов для логина и пароля,
    кнопка «Вход» и checkbox «Запомнить меня». С помощью CSS, который расположен в отдельном файле,
    выровняйте форму для авторизации по центру страницы. Разработайте сценарий, который будет
    срабатывать по нажатию на кнопку «Вход». Сценарий должен реализовывать следующее поведение:\nЕсли при нажатии на кнопку поля ввода пустые – выводиться сообщение (в теле страницы, не 
    через alert) «Вы не заполнили поля логин и пароль». Также поля вводов должны получить 
    красный фон.\n Если введен логин admin и пароль 12345, то отобразить пользователю зеленым цветом 
    сообщение «Вы авторизированы».`,
    excDescription3: `Разработайте сценарий, который каждую секунду будет случайным образом менять положение трех
    элементов div. Задайте элементам фиксированную ширину и высоту и запустите сценарий при загрузке
    страницы.`,
    excDescription4: `Разработайте страницу, разместите на ней четыре кнопки – «вверх», «вниз», «влево», «вправо».
    Поместите на странице div с текстом. При нажатии на кнопки должна запускаться анимация, которая
    перемещает div на 100 px в соответствующем направлении.`,
    excDescription5: "Было видеописание"
  };
  let helps = [...document.getElementsByClassName("exc-description")];
 
  helps.forEach(item => {

    item.onmouseover = e => {
      item.style.cursor = "pointer";
      let prNAme = item.id.replace("Description", "");
      let parent = document.getElementById(`${prNAme}`);
      let lgnError = document.createElement("p");
      lgnError.style.position = "fixed";
      // lgnError.style.top = e.clientX +'px';
      // lgnError.style.left = 0;
      lgnError.style.top =`${e.clientY+10}px`;
      lgnError.classList = "helpers";
      lgnError.innerHTML = desc[item.id];
      document.getElementById("mainContainer").insertBefore(lgnError, parent);
      console.log(parent.id, prNAme, e.clientY);
    };

    item.onmouseout = e => {
      let hh = [...document.getElementsByClassName("helpers")];
      hh.forEach(item=>{
        document.getElementById("mainContainer").removeChild(item);
      });
    };
  });
}

window.onload = () => {
  let exc1 = new Exc1();
  exc3();
  exc4();
  exc2();
  help();
};
