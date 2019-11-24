document.addEventListener("DOMContentLoaded", function() {
  //Constants block
  const EXC2_TEXT_ID = "exc2-text";
  //end constants block
  init();

  function init() {
    exc2();
  }

  function exc2() {
    let text = document.getElementById(EXC2_TEXT_ID);
    window.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 71:
          text.style.color = "green";
          break;
        case 82:
          text.style.color = "red";
          break;
        case 66:
          text.style.color = "blue";
          break;
      }
    });
  } //end exc2
});
