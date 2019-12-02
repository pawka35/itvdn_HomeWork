window.addEventListener("DOMContentLoaded", () => {
  let activeWindow = ""; //активное в данный момент окно задания
  let allexc = { "1": exc1, "2": exc2, "3": exc3 }; //функции для каждого задания
  let btns = [...document.getElementsByClassName("mnBtn")]; //кнопки вызова заданий

  btns.forEach(item => {
    //навешиваем действия на кнопки выбора заданий
    item.addEventListener("click", e => {
      let nb = e.target.id.replace("mn_exc", ""); //определяем какое задания надо запустить
      // console.log("exc" + nb);
      let thisWind = document.getElementById("exc" + nb); //определяем какое окно надо открыть
      if (thisWind != activeWindow) {
        //если это окно еще не открыто, то открываеми
        closeActiveWindow(thisWind);
      } else {
        //если окно уже и так открыто, то ничего не делаем
        return;
      }
      allexc[nb](); //запускаем выполнения соответствующего задания
      btns.forEach(item => item.classList.remove("exc-checker-checked")); //снимаем метку нажатой со всех кнопок
      e.target.classList.add("exc-checker-checked"); //ставим метку нажатия на нажатую кнопку
    });
  });

  function closeActiveWindow(newWind) {
    //функция открытия окна задания
    //закрываем открытое и открываем переданное
    if (activeWindow) {
      //если какое-то окно отрыто, то закрываем его
      activeWindow.style.display = "none";
    }
    activeWindow = newWind; //запоминаем окно которое открываем, как открытое
    activeWindow.style.display = "grid"; //собственно показываем его
  }

  function preload() {
    //функция предзагрузки изображений (разобрана в примерах)
    let images = [];
    [...preload.arguments].forEach(item => {
      //   console.log(item);
      let img = new Image();
      img.src = item;
      images.push(img);
    });
    return images;
  }

  function exc1() {
    //задание 1
    let images = preload(
      //предзагружаем нашик артинки в массив
      "images/exc1/1.png",
      "images/exc1/2.png",
      "images/exc1/3.png"
    );
    let imgDiv = document.getElementById("exc1-image"); //ищем див где отображать картинку
    let exc1Btn = [...document.getElementsByClassName("exc1-btn")]; //находим все кнопки

    exc1Btn.forEach(item => {
      //для каждой кнопки навешиваем событие на нажатие
      item.addEventListener("click", e => {
        let needImg = e.target.id.replace("exc1-btn", ""); //определяем какое изображение нам надо открыть
        imgDiv.style.backgroundImage = `url("${images[needImg - 1].src}")`; //отображаем
      });
    });
  }

  function exc2() {
    //упражнение 2
    const BIG_IMG_FOLDER = "images/ecx2"; //папка где лежат большие изображения
    let activeDiv = ""; //текущее активное изображение
    let previewImages = preload(
      //предзагружаем маленькие картинки
      "images/ecx2/preview/preview_1.jpg",
      "images/ecx2/preview/preview_2.jpg",
      "images/ecx2/preview/preview_3.jpg",
      "images/ecx2/preview/preview_4.jpg"
    );

    let previewImageDivs = [
      ...document.getElementsByClassName("exc2-image-preview")
    ]; //находим все дивы,где должны быть превьюхт
    for (let i = 0; i < previewImages.length; i++) {
      //размещаем превью
      previewImageDivs[
        i
      ].style.backgroundImage = `url("${previewImages[i].src}")`;
    }

    previewImageDivs.forEach(item => {
      //на каждый див с превью навешиваем действие на нажатие
      item.addEventListener("click", e => {
        let bigDiv = document.getElementById("exc2-image-bigView"); //находим наш див для отображения большое картинки
        let bigDivImg = document.getElementById("exc2-image-bigView-image"); //находим в нем место для отображения
        if (activeDiv == e.target.id) {
          //если и так открыто это изображение, то нафиг
          return;
        } else {
          activeDiv = e.target.id;
          // console.log(e.target.id);
          bigDivImg.style.backgroundImage = `url("${BIG_IMG_FOLDER}/${e.target.id.replace(
            "exc2-image",
            ""
          )}.jpg")`; //отображаем большое изображение

          bigDiv.classList.add("b-show"); //плавно показываем большой див (см. css)
          let cls = document.getElementById("exc2-image-bigView-close"); //кнопка закрыть в большое диве
          cls.addEventListener("click", e => {
            //при нажатии на кнопку закрытий, див закрывается. Ваш К.О.
            bigDiv.classList.remove("b-show");
          });
        }
      });
    });
  }

  function exc3() {
    //упражнение 3
    let valueArr = []; //массив для значений
    let colors = []; //массив для цветов

    let addToTblBtn = document.getElementById("ecx3-addBtn"); //кнопка внесения в таблицу из инпутов
    let valueInp = document.getElementById("exc3-valInput"); //инпут значения
    let nameInp = document.getElementById("exc3-NameInput"); //инпут названия
    let tableBody = document //находим тело нашей таблицы
      .getElementById("exc3-table")
      .getElementsByTagName("tbody")[0];

    valueInp.addEventListener("keydown", e => {
      //не даем вводит в инпут значений ничего кроме цифр(ну и стирать можно)
      if (!/[0-9]/.test(e.key) && e.key != "Backspace") {
        e.preventDefault();
      }
    });

    let radioGraphs = [...document.getElementsByName("graph")]; //наши радио-буттоны переключения вида графика
    radioGraphs.forEach(item => {
      //вешаем рекакцию на переключение радио-баттонов
      item.addEventListener("change", e => {
        if (valueArr.length == 0) {
          //если значений нет, то ничего не делаем (график не построить один фиг)
          return;
        }
        changeGraphType(e.target.id); //запускаем функция отображения графика
      });
    });

    function changeGraphType(radioBnt) {
      //функция отображения графика
      //смотрим какой график нужен и вызываю функцию рисования конктретного типа
      switch (radioBnt) {
        case "line":
          createLeaner("convasContainer", valueArr, 500, 200, colors);
          break;
        case "bar":
          createDiagram("convasContainer", valueArr, 500, 200, colors);
          break;
        case "circle":
          let myDiagram = new Diagram({
            canvas: document.getElementById("canvasContainer"),
            data: valueArr,
            colors: colors
          });
          myDiagram.draw();
      }
    }

    addToTblBtn.addEventListener("click", e => {
      //добавляем значение в таблицу
      var newRow = tableBody.insertRow(tableBody.rows.length); //вставляем новую строку в таблицу
      var newCell = newRow.insertCell(0); //делаем новые ячейки
      var newCell2 = newRow.insertCell(1);
      var newCell3 = newRow.insertCell(2);
      if (nameInp.value == "") {
        if (valueInp.value == "") {
          //не позволяем отправить пустое значение в таблицу
          return;
        }
        nameInp.value = `Параметр ${valueArr.length + 1}`; //если не ввели имя, то сами генерим
      }

      var newText = document.createTextNode(nameInp.value); //значение для ячеек
      var newText2 = document.createTextNode(valueInp.value);

      valueArr.push(parseInt(newText2.data)); //добавляем значение в нащ массив значений, для передачи на построение
      let newColor = getRandomColor(); //генерим случайный цвет
      colors.push(newColor); //также формаируем массиф цвето для передачи на построение
      newCell.appendChild(newText); //тут добавляем нащи значения в ячейки
      newCell2.style.textAlign = "center";
      newCell2.appendChild(newText2);
      newCell3.style.backgroundColor = newColor;
      valueInp.value = "";
      nameInp.value = "";
      let radioGraph = document.querySelector('input[name="graph"]:checked'); //это мы не проходили, но лень было писать
      //цикл перебора, поэтому сразу определяем выбранный радио-буттон
      changeGraphType(radioGraph.id); //заново перересовываем график (у нас новые значения)
    });
  }

  //рисуем линейный график...остальные нарисова Петру...поэтому сам написал только этот тип
  function createLeaner(canvasId, data, width, height, colors) {
    const canvas = document.getElementById("canvasContainer");
    canvas.width = width + 20;
    canvas.height = height + 20;

    let max = data.reduce(function(cur, prev) {
      return Math.max(cur, prev);
    });
    let koef = (height - 25) / max; //коэфициент пропорционального уменьшения
    // console.log(koef);

    let shag = Math.floor(parseInt(width) / data.length);//расстояние между значениями
    let context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(10, height - data[0] * koef); //первое значение ставим в точке 10 по иксу 
    context.strokeText(data[0], 10, height - data[0] * koef - 15);
    for (let i = 1; i < data.length; i++) { //пробегаемся по всему массиву со значениями и расставляем точки
      context.lineTo(i * shag, height - data[i] * koef);
      context.strokeText(data[i], i * shag, height - data[i] * koef - 15); //подписываем значения
    }
    context.stroke();

    /*чертим оси*/
    context.strokeText("0", 0, height);
    context.strokeText("Y", 5, 0);
    context.strokeText("X", width, height);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, height);

    context.moveTo(0, height);
    context.lineTo(width, height);
    context.stroke();
    /*закончили чертить оси*/
  }

  //thank`s to Petru
  function createDiagram(canvasId, data, width, height, colors) {
    const canvas = document.getElementById("canvasContainer");
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext("2d");
    let max = data.reduce(function(cur, prev) {
      return Math.max(cur, prev);
    });
    let scale = height / max;
    let barWidth = Math.round(width / data.length);
    for (let i in data) {
      let barHeight = data[i] * scale,
        x = barWidth * i,
        y = height - barHeight;
      context.fillStyle = colors[i];
      context.fillRect(x, y, barWidth - 4, barHeight);
    }
  }
});

let Diagram = function(options) {
  this.options = options;
  this.canvas = options.canvas;
  this.canvas.width = 500;
  this.canvas.height = 500;
  this.context = this.canvas.getContext("2d");
  this.colors = options.colors;
  this.draw = function() {
    let total_value = 0,
      color_index = 0;
    for (let i in this.options.data) {
      total_value += this.options.data[i];
    }
    let start_angle = 0;
    for (i in this.options.data) {
      let slice_angle = (2 * Math.PI * this.options.data[i]) / total_value;
      drawPieSlice(
        this.context,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );
      start_angle += slice_angle;
      color_index++;
    }
  };
};

function drawPieSlice(
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

//thank`s to overflow https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
