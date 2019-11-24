//переработанный пример из аналогичного задания урока 18 CSS and JS
//https://github.com/pawka35/itvdn_HomeWork/tree/hw18_JSandCSS

window.addEventListener("DOMContentLoaded", () => {
  const ELEMENT_ID = "exc0-square";
  const FIELD_ID = "exc0-field";
  
  init();

  function init() {
    let element = document.getElementById(ELEMENT_ID);
    let parent = document.getElementById(FIELD_ID);

    document.addEventListener("keydown", e => {
      console.log(e.keyCode);
      move(e.keyCode, element, parent);
    });
  }

  function move(item, element, parent) {
    let counter = 0;
    let interval = setInterval(() => {
      if (counter == 10) {
        clearInterval(interval);
      }
      switch (item) {
        case 39:
          if (element.offsetLeft > parent.clientWidth + parent.offsetLeft - 30) {break;}
          element.style.right =
            parseInt(window.getComputedStyle(element, null)["right"]) - 1 +"px";
            break;
        case 37:
          if (element.offsetLeft < parent.offsetLeft) {break;}
          element.style.right =
            parseInt(window.getComputedStyle(element, null)["right"]) + 1 + "px";
            break;
        case 40:
          if (element.offsetTop > parent.clientHeight + parent.offsetTop - 30) {break;}
          element.style.top =
            parseInt(window.getComputedStyle(element, null)["top"]) + 1 + "px";
          break;
        case 38:
          if (element.offsetTop < parent.offsetTop) {
            break;
          }
          element.style.top =
            parseInt(window.getComputedStyle(element, null)["top"]) - 1 + "px";
          break;
      }
      counter++;
    }, 10);
  }
});
