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
  getElem("testDiv").innerHTML = this.RndNumber;
  this.btn.onclick = () => {
    getElem("tryCount").innerHTML = ++this.tryCount;
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
          if (element.offsetLeft < 15) {
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
    window.open("exc2.html", "Авторизация", "width=600px,heigth=600px, location=no");
  };
}

window.onload = () => {
  let exc1 = new Exc1();
  exc3();
  exc4();
  exc2();
};
