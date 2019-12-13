let radius = 15; //радиус шарика
let ballColor = "red";
let dx = 0; //приращенияе по х
let dy = 0; //приращение по y
let score = 0; //набранные очки
let timer = null; //таймер для анимации
let scoreDiv = document.getElementById("score"); //див для отображения очков
let speed = 300;
let addScoreVal = 1; //сколько очков приьавляем за съедение конфеты

currentDirection = "left"; //направление движения
let canvas = document.getElementById("gameCanvas"),
  context = canvas.getContext("2d"); //канвас

canvas.width = window.innerWidth - 120; //ширина канваса
canvas.height = window.innerHeight - 100; //высота канваса

function addScore() {
  //функция прибавления набранных очков
  score += addScoreVal;
  scoreDiv.innerHTML = score;
  if (score % 10 == 0) {
    alert("levUp!");

    //каждые 10 очков повышаем скорость, увеличиваем очки
    if (speed > 50) {
      //чтобы не уйти уж совсем в малые значения
      speed -= 20;
      clearInterval(timer); //переназначаем скорость игры
      timer = setInterval(DrawBall, speed);
    }
    // addScoreVal+=1; //увлеичиваем награду...для ускорения - раскоментировать
  }
}

function zm(x, y) {
  //конструктор для задания координат центра для окружности на холсте
  this.x = x;
  this.y = y;
  this.lastX = x;
  this.lastY = y;
  // console.log(this.x, this.y);
}

let body = [new zm(100, 100)]; //массив для звеньев змейки
let candy = []; //массив для шарикоВ, которые ест змейка
createCandy(3); // при старте создаем 3 конфетки

function createCandy(colvo) {
  //функция для создания конфет (кол-во создаваемых примает в параметре)
  for (i = 0; i < colvo; i++) {
    candy.push(
      new zm(
        randomize(20, canvas.width - 20),
        randomize(20, canvas.height - 20)
      )
    );
  }
}

function gameOver() {
  // функция остановки игру и показа окна "вы проиграли"
  clearInterval(timer);
  document.getElementById("spanRes").innerHTML = scoreDiv.innerHTML;
  document.getElementById("gameover").style.display = "block";
  canvas.style.display = "none";
}
// console.log(candy);

(function prestart() {
  //инициализация игры
  for (ball of body) {
    //рисуем головову змеи
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI * 2, true);
    context.fillStyle = "red";
    context.fill();
  }

  for (ball of candy) {
    ///рисуем ранее созданные конфеты
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI * 2, true);
    context.fillStyle = "yellow";
    context.fill();
  }
  // timer = setInterval(DrawBall, speed);//запускаем игру
})();

function checkColision() {
  //функция проверки столкновения "головы змей"
  let head = body[0]; //берем в отдельную переменную голову
  if (
    //проверка выхода головы за пределы игрового поля (канваса)
    head.x > canvas.width - radius ||
    head.x < 0 ||
    head.y > canvas.height - radius ||
    head.y < 0
  ) {
    gameOver();
  }

  for (i = 1; i < body.length; i++) {
    //проверка столкновения головы с любой составляющей тела
    f = Math.sqrt((body[i].x - head.x) ** 2 + (body[i].y - head.y) ** 2);
    // console.log(f);
    if (f < radius * 2) {
      console.log("bam!");
      gameOver();
    }
  }

  for (can of candy) {
    //проверка на столкновение головы с "конфетой"
    let f = Math.sqrt((can.x - head.x) ** 2 + (can.y - head.y) ** 2); //расстояние между центрами окружностей
    if (f < radius * 2) {
      //если на расстоянии меньше, чем диамето
      let newZm = new zm( //прибавляем к телу змеи еще один шарик
        body[body.length - 1].x - (body.length + radius * 2),
        body[body.length - 1].y
      );
      body.push(newZm);
      let ind = candy.indexOf(can); //находим которую конфету мы съели
      candy.splice(ind, 1); //удаляем ее из массива
      addScore(); //прибавляем очки
      createCandy(1); //создаем новую конфету
      break;
    }
  }
}

function DrawBall() {
  //функция отрисовки игры (вызывается в таймере)
  context.clearRect(0, 0, canvas.width, canvas.height); //чистим поле
  for (let i = 0; i < body.length; i++) {
    //для каждого звена змейки
    body[i].lastX = body[i].x; //записываем в какой точке находилось звено (чтобы на это место поставить следующее звено)
    body[i].lastY = body[i].y;
    context.beginPath();
    if (i == 0) {
      // если рисуем голову змеи
      context.arc(
        // рисуем новый круг, учитывая шаг смещения
        (body[i].x += dx),
        (body[i].y += dy),
        radius,
        0,
        Math.PI * 2,
        true
      );
      context.fillStyle = "red"; //голова будем красной
      checkColision();
    } else {
      //если отрисовываем другие части змеи
      body[i].x = body[i - 1].lastX; //перемещаем часть на то место, где была предыдущая
      body[i].y = body[i - 1].lastY;
      context.arc(body[i].x, body[i].y, radius, 0, Math.PI * 2, true);
      context.fillStyle = "green";
    }
    context.stroke();
    context.fill();
  }

  for (ball of candy) {
    //рисуем конфетки
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI * 2, true);
    context.fillStyle = "yellow";
    context.fill();
  }
}

document.onkeydown = function(e) {
  //следим за тем, что нажал пользователь
  e.preventDefault(); //чтобы не прокручивался экран, при нажатии на стрелки
  // console.log(e.keyCode);
  switch (
    e.keyCode //в зависимости от нажатой клавиши, меняем величину и знак приращения центра координат
  ) {
    case 40: {
      if (dy == -30) {
        //если змея шла вниз, нельзя ее сразу направить вверх
        break;
      } else {
        dx = 0;
        dy = 30;
        break;
      }
    }
    case 38: {
      if (dy == 30) {
        break;
      } else {
        dx = 0;
        dy = -30;
        break;
      }
    }
    case 37: {
      if (dx == 30) {
        break;
      } else {
        dx = -30;
        dy = 0;
        break;
      }
    }
    case 39: {
      if (dx == -30) {
        break;
      } else {
        dx = 30;
        dy = 0;
        break;
      }
    }
    case 32: {
      //нажатие пробела
      console.log(timer);
      if (timer == null) {
        //если игра не запушена, запускаем, иначе останавливаем (ВАШ К.О)
        if (dx == 0 && dy == 0) {
          dx = 30;
        } //если не куда не двигались, начинаем движение вправо
        timer = setInterval(DrawBall, speed);
      } else {
        clearInterval(timer);
        timer = null;
      }
    }
  }
};

function randomize(min, max) {
  //функиця генерации случайного значения из диапазона
  return Math.floor(Math.random() * (max - min + 1) + min);
}
