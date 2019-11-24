document.addEventListener("DOMContentLoaded", function() {
  const EXC3_FILED_ID = "exc3-field";
  const EXC3_BUTTON_ID = "exc3-button";
  //end constants block
  init();

  function init() {
    exc3();
  }

  function exc3() {
    let field = document.getElementById(EXC3_FILED_ID);
    let bnt = document.getElementById(EXC3_BUTTON_ID);

    bnt.addEventListener("mouseover", function(e) {
      elemRun(this, e);
    });

    function elemRun(elem, event) {
      let btnWidth = parseInt(window.getComputedStyle(elem, null)["width"]);
      let btnHeight = parseInt(window.getComputedStyle(elem, null)["height"]);
      elem.style.left = randomInteger(0, field.clientWidth - btnWidth) + "px";
      elem.style.top = randomInteger(0, field.clientHeight - btnHeight) + "px";
    }

    function randomInteger(min, max) {
      let rand = min + Math.random() * (max - min);
      return Math.floor(rand);
    }
  } //end exc3
}); //end of onload
