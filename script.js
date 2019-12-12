let centerX = 250,
  centerY = 200,
  radius = 15,
  ballColor = "red",
  dx = 0,
  dy = 0,
  score = 0;
// gameWidth = screen.width;
// gameHeight = screen.height;
let timer = null;
let scoreDiv = document.getElementById("score");

currentDirection = "left";
let canvas = document.getElementById("gameCanvas"),
  context = canvas.getContext("2d");

canvas.width = window.innerWidth - 120;
canvas.height = window.innerHeight - 100;

function addScore() {
  console.log(scoreDiv.innerHTML);
  scoreDiv.innerHTML = parseInt(scoreDiv.innerHTML) + 1;
}

function zm(x, y) {
  this.x = x;
  this.y = y;
  this.lastX = x;
  this.lastY = y;
  console.log(this.x, this.y);
}

let body = [new zm(100, 100)];
let candy = [];
createCandy(3);

function createCandy(colvo) {
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
  clearInterval(timer);
  document.getElementById('spanRes').innerHTML = scoreDiv.innerHTML;
  document.getElementById('gameover').style.display = "block";
  canvas.style.display = 'none';
  
}
// console.log(candy);

(function prestart() {
  for (ball of body) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI * 2, true);
    context.fillStyle = "green";
    context.fill();
  }

  for (ball of candy) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI * 2, true);
    context.fillStyle = "yellow";
    context.fill();
  }
  timer = setInterval(DrawBall, 300);
})();

function checkColision() {
  let head = body[0];

  if (
    head.x > canvas.width - radius ||
    head.x < 20 ||
    head.y > canvas.height - radius ||
    head.y < 20
  ) {
    gameOver();
  }

  for (i = 1; i < body.length; i++) {
    f = Math.sqrt((body[i].x - head.x) ** 2 + (body[i].y - head.y) ** 2);
    console.log(f);
    if (f < 30) {
      console.log("bam!");
      gameOver();
    }
  }

  for (can of candy) {
    let f = Math.sqrt((can.x - head.x) ** 2 + (can.y - head.y) ** 2); //расстояние между центрами окружностей
    if (f < 30) {
      let newZm = new zm(
        body[body.length - 1].x - (body.length + radius * 2),
        body[body.length - 1].y
      );
      body.push(newZm);
      let ind = candy.indexOf(can);
      candy.splice(ind, 1);
      addScore();
      createCandy(1);
    }
  }
}

function DrawBall() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < body.length; i++) {
    body[i].lastX = body[i].x;
    body[i].lastY = body[i].y;
    context.beginPath();
    if (i == 0) {
      context.arc(
        (body[i].x += dx),
        (body[i].y += dy),
        radius,
        0,
        Math.PI * 2,
        true
      );
      context.fillStyle = "red";
      checkColision();
    } else {
      body[i].x = body[i - 1].lastX;
      body[i].y = body[i - 1].lastY;
      context.arc(body[i].x, body[i].y, radius, 0, Math.PI * 2, true);
      context.fillStyle = "green";
    }
    context.stroke();
    context.fill();
  }

  for (ball of candy) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI * 2, true);
    context.fillStyle = "yellow";
    context.fill();
  }
}

document.onkeydown = function(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 40: {
      if (dy == -30) {
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
  }
  currentDirection = direction[e.keyCode];
};

let direction = {
  37: "left",
  39: "right",
  38: "up",
  40: "down"
};

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
