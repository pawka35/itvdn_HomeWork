window.addEventListener("DOMContentLoaded", () => {
  //Constants block
  const COLOCHECKER_ID = "colorSelect";
  const TEXTAREA_ID = "textOutput";
  const FONT_SIZE_INPUT_ID = "fontSizeInput";
  const RESET_BUTTON_ID = "resetButton";
  const DEFAULT_COLOR = '#ffffff';
  const DEFAULT_FNT_SIZE = '12px';

  //End of constants block

  init();

  function init() {
    let elements = {
      //заполняем ассициативный массив элементами, которыми манипулируем
      colorChecker: document.getElementById(COLOCHECKER_ID),
      textArea: document.getElementById(TEXTAREA_ID),
      fntSize: document.getElementById(FONT_SIZE_INPUT_ID),
      resetButton: document.getElementById(RESET_BUTTON_ID)
    };

    readCookies(elements); //функция для чтения значений из cookie
    addEvents(elements); //определяем реакцию элементов на действия
  }

  function readCookies(elements) {
    console.log("sfd");
    if (window.localStorage.color) {
      //если в куках есть значение цвета фона для текста
      elements["textArea"].style.backgroundColor = window.localStorage.color; //присваиваем цвет фону
      elements["colorChecker"].value = window.localStorage.color; //выставляем значение инпута в соотв. с полученным
    } else {
      //если нет, то скидываем на "по-умолчанию"
      elements["textArea"].style.backgroundColor = DEFAULT_COLOR;
      elements["colorChecker"].value = DEFAULT_COLOR; 
    }
    if (window.localStorage.fntSize) {
      //тоже для значения размера щрифта
      elements["fntSize"].value = parseInt(window.localStorage.fntSize);
      elements["textArea"].style.fontSize = window.localStorage.fntSize;
    }else{
        elements["fntSize"].value = parseInt(DEFAULT_FNT_SIZE);
        elements["textArea"].style.fontSize = DEFAULT_FNT_SIZE;
    }
  }

  function addEvents(elements) {
    let colorChecker = elements["colorChecker"]; //определяем элементы
    let resetBtn = elements["resetButton"];
    let textArea = elements["textArea"];
    let fntSize = elements["fntSize"];

    fntSize.addEventListener("input", e => {
      //при изменении инпута размера шрифта
      textArea.style.fontSize = e.target.value + "px"; //делаем текст размера, как в инпуте
      window.localStorage.fntSize = textArea.style.fontSize; // записываем текущее значение в куки
    });

    fntSize.addEventListener("keydown", e => {
      // при нажатии клавиши внутри инпута размера шрифта
      let regular = /[0-9]/; // мы должны принимать только цифры

      switch (e.keyCode) {
        case 38: // если нажали кнопку вверх
          fntSize.value = +fntSize.value + 1; //увеличиваем размер на 1
          fntSize.dispatchEvent(new Event("input")); //имитируем ввод этого значения с клавиатуры
          break;
        case 40: //тоже для кнопки вниз
          if (fntSize.value - 1 <= 0) {
            //проверяем что размер не станет орицательным
            e.preventDefault();
          } else {
            fntSize.value -= 1;
          }

          fntSize.dispatchEvent(new Event("input"));
          break;
        default:
          //для всех остальных кнопок
          if (!regular.test(e.key) && e.key != "Backspace") {
            //если не цифра и не стираем символ
            e.preventDefault(); //предотвращаем действие
          }
          break;
      }
    });

    colorChecker.addEventListener("change", e => {
      //изменение значения инпута выбора цвета
      //   console.log(colorChecker.value);
      textArea.style.backgroundColor = colorChecker.value; //делаем текст выбранного цвета
      window.localStorage.color = colorChecker.value; //записываем в куки
    });

    resetBtn.addEventListener("click", e => {
      window.localStorage.clear();
      readCookies(elements);
    });
  }
});
