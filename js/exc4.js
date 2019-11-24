document.addEventListener("DOMContentLoaded", function() {
  //Constants block
  const EXC4_FILED_ID = "exc4-field";


  init();

  function init() {
    exc4();
  }

  function exc4() {
    window.addEventListener("keydown", e => {
      e.preventDefault();
      if ((e.keyCode = 0 || e.keyCode < 32)) {
        return;
      }
      switch (e.keyCode) {
        case 83: //нажата S
          if (e.ctrlKey && e.shiftKey) {
            //также нажаты ctr и shit
            alert("Сохранено всё");
          } else if (e.ctrlKey) {
            //также нажате ctr
            alert("Сохранено");
          }
          break;

        case 65: //нажата d
          if (e.ctrlKey) alert("Выбрано всё"); // также нажата ctrl
          break;
      }
    });
  } //end exc4
}); //end of onload
