window.addEventListener("DOMContentLoaded", () => {
  //Constants block
  const COLOCHECKER_ID = "colorSelect";
  const OUTPUTINFO_ID = "outputInfo";
  const TEXTAREA_ID = "textOutput";
  const FONT_SIZE_INPUT_ID = "fontSizeInput";
  //End of constants block

  init();

  function init() {
    let elements = {
      colorChecker: document.getElementById(COLOCHECKER_ID),
      outputInfo: document.getElementById(OUTPUTINFO_ID),
      textArea: document.getElementById(TEXTAREA_ID),
      fntSize: document.getElementById(FONT_SIZE_INPUT_ID)
    };
    
    readCookies(elements);
    addEvents(elements);
  }

  function readCookies(elements) {
    if (window.localStorage.color) {
      elements["textArea"].style.color = window.localStorage.color;
    }
    if (window.localStorage.fntSize) {
      elements["fntSize"].value = parseInt(window.localStorage.fntSize);
      elements["textArea"].style.fontSize = window.localStorage.fntSize;
    }
  }

  function addEvents(elements) {
    let colorChecker = elements["colorChecker"];
    let outputInfo = elements["outputInfo"];
    let textArea = elements["textArea"];
    let fntSize = elements["fntSize"];

    fntSize.addEventListener("input", e => {
      console.log(e.target.value);
      textArea.style.fontSize = e.target.value + "px";
      window.localStorage.fntSize = textArea.style.fontSize;
    });

    fntSize.addEventListener("keydown", e => {
      console.log(e.keyCode);
      let regular = /[0-9]/;

      switch (e.keyCode) {
        case 38:
          fntSize.value = +fntSize.value + 1;
          fntSize.dispatchEvent(new Event("input"));
          break;
        case 40:
          fntSize.value -= 1;
          fntSize.dispatchEvent(new Event("input"));
          break;
        default:
          if (!regular.test(e.key) && e.key != "Backspace") {
            e.preventDefault();
          }
          break;
      }
    });

    colorChecker.addEventListener("change", e => {
      console.log(colorChecker.value);
      outputInfo.innerHTML = colorChecker.value;
      textArea.style.color = colorChecker.value;
      window.localStorage.color = colorChecker.value;
    });
  }
});
