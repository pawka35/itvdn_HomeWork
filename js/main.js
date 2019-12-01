window.addEventListener("DOMContentLoaded", () => {
  // <li id="exc1">Задание 1</li>
  //   <li id="exc2">Задание 2</li>
  //   <li id="exc3">Задание 3</li>
  let allexc = { "1": exc1, "2": exc2, "3": exc3 };
  let btns = [...document.getElementsByClassName("mnBtn")];
  // console.log(btns);

  btns.forEach(item => {
    item.addEventListener("click", e => {
      let nb = e.target.id.replace("mn_exc", "");
      // console.log(nb);
      // console.log(e.target.id.replace("exc",""));
      allexc[nb]();
    });
  });

  function exc1() {
    let thisWind = document.getElementById("exc1");
    console.log(thisWind);
    thisWind.style.display = "block";
    // let urls = ["images/exc1/1.png", "images/exc1/2.png", "images/exc1/3.png"];
    let images = [];
    function preload() {
      [...preload.arguments].forEach(item => {
        //   console.log(item);
        let img = new Image();
        img.src = item;
        images.push(img);
      });
    }

    preload("images/exc1/1.png", "images/exc1/2.png", "images/exc1/3.png");
    // console.log(images);

    let imgDiv = document.getElementById("exc1-image");
    //   console.log(imgDiv);

    let exc1Btn = [...document.getElementsByClassName("exc1-btn")];

    exc1Btn.forEach(item => {
      item.addEventListener("click", e => {
        let needImg = e.target.id.replace("exc1-btn", "");
        imgDiv.style.backgroundImage = `url("${images[needImg - 1].src}")`;
      });
    });
  }

  function exc2() {
    console.log(exc2);
  }

  function exc3() {
    console.log(exc3);
  }


});
