window.addEventListener("DOMContentLoaded", () => {
  // <li id="exc1">Задание 1</li>
  //   <li id="exc2">Задание 2</li>
  //   <li id="exc3">Задание 3</li>
  let activeWindow = "";

  let allexc = { "1": exc1, "2": exc2, "3": exc3 };
  let btns = [...document.getElementsByClassName("mnBtn")];
  // console.log(btns);

  btns.forEach(item => {
    item.addEventListener("click", e => {
      let nb = e.target.id.replace("mn_exc", "");
      allexc[nb]();
    });
  });

  function preload() {
    let images = [];
    [...preload.arguments].forEach(item => {
      //   console.log(item);
      let img = new Image();
      img.src = item;
      images.push(img);
    });
    return images;
  }

  function closeActiveWindow(newWind) {
    //закрываем открытое и открываем переданное
    if (activeWindow) {
      activeWindow.style.display = "none";
    }
    activeWindow = newWind;
    activeWindow.style.display = "grid";
  }

  function exc1() {
    let thisWind = document.getElementById("exc1");
    closeActiveWindow(thisWind);

    let images = preload(
      "images/exc1/1.png",
      "images/exc1/2.png",
      "images/exc1/3.png"
    );
    let imgDiv = document.getElementById("exc1-image");
    let exc1Btn = [...document.getElementsByClassName("exc1-btn")];

    exc1Btn.forEach(item => {
      item.addEventListener("click", e => {
        let needImg = e.target.id.replace("exc1-btn", "");
        imgDiv.style.backgroundImage = `url("${images[needImg - 1].src}")`;
      });
    });
  }

  function exc2() {
    let thisWind = document.getElementById("exc2");
    closeActiveWindow(thisWind);

    let activeDiv = "";
    let previewImages = preload(
      "images/ecx2/preview/preview_1.jpg",
      "images/ecx2/preview/preview_2.jpg",
      "images/ecx2/preview/preview_3.jpg",
      "images/ecx2/preview/preview_4.jpg"
    );

    let previewImageDivs = [
      ...document.getElementsByClassName("exc2-image-preview")
    ];
    for (let i = 0; i < previewImages.length; i++) {
      previewImageDivs[
        i
      ].style.backgroundImage = `url("${previewImages[i].src}")`;
    }

    previewImageDivs.forEach(item => {
      item.addEventListener("click", e => {
        let bigDiv = document.getElementById("exc2-image-bigView");
        let bigDivImg = document.getElementById("exc2-image-bigView-image");
        if (activeDiv == e.target.id) {
          return;
        } else {
          activeDiv = e.target.id;
          bigDivImg.style.backgroundImage = `url("${
            previewImages[e.target.id.replace("exc2-image", "") - 1].src
          }")`;
          bigDiv.classList.add("b-show");
          let cls = document.getElementById("exc2-image-bigView-close");
          cls.addEventListener("click", e => {
            bigDiv.classList.remove("b-show");
          });
        }
      });
    });

    // document.getElementById('exc2-image-bigView').classList.add('b-show');
    // D:\ITVDN Cours\itvdn_HomeWork\images\ecx2\preview\preview_1.jpg
  }

  function exc3() {
    let valueArr = [];
    let colors = [];
    let thisWind = document.getElementById("exc3");
    closeActiveWindow(thisWind);

    let addToTblBtn = document.getElementById("ecx3-addBtn");
    let valueInp = document.getElementById("exc3-valInput");
    let nameInp = document.getElementById("exc3-NameInput");
    let tableBody = document
      .getElementById("exc3-table")
      .getElementsByTagName("tbody")[0];


    let radioGraphs = [...document.getElementsByName("graph")];
    radioGraphs.forEach(item => {
      item.addEventListener("change", e => {
        changeGraphType(e.target.id);
      });
    });

    function changeGraphType(radioBnt) {
      console.log("cha", radioBnt);
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
      var newRow = tableBody.insertRow(tableBody.rows.length);
      var newCell = newRow.insertCell(0);
      var newCell2 = newRow.insertCell(1);
      var newCell3 = newRow.insertCell(2);
      if (nameInp.value == "") {
        nameInp.value = `Параметр ${valueArr.length + 1}`;
      }
      var newText = document.createTextNode(nameInp.value);
      var newText2 = document.createTextNode(valueInp.value);

      valueArr.push(parseInt(newText2.data));
      let newColor = getRandomColor();
      colors.push(newColor);
      newCell.appendChild(newText);
      newCell2.style.textAlign = "center";
      newCell2.appendChild(newText2);
      newCell3.style.backgroundColor = newColor;
      valueInp.value = "";
      nameInp.value = "";
      let radioGraph = document.querySelector('input[name="graph"]:checked');
      changeGraphType(radioGraph.id);
    });
  }

  function createLeaner(canvasId, data, width, height, colors) {
    const canvas = document.getElementById("canvasContainer");
    canvas.width = width + 20;
    canvas.height = height + 20;

    let max = data.reduce(function(cur, prev) {
      return Math.max(cur, prev);
    });
    let koef = (height - 25) / max; //коэфициент пропорционального уменьшения
    console.log(koef);

    let shag = Math.floor(parseInt(width) / data.length);
    let context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(10, height - data[0] * koef);
    context.strokeText(data[0], 10, height - data[0] * koef - 15);
    for (let i = 1; i < data.length; i++) {
      context.lineTo(i * shag, height - data[i] * koef);
      context.strokeText(data[i], i * shag, height - data[i] * koef - 15);
      context.textBaseline = "hanging";
      console.log(height, height - data[i] * koef);
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
