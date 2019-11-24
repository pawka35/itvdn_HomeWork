document.addEventListener("DOMContentLoaded", function() {
  //Constants block
  const EXC1_TEXTAREA_ID = "exc1-textarea";
  const EXC1_SAVE_BUTTON_ID = "exc1-save-button";
  const EXC2_TEXT_ID = "exc2-text";
  const EXC3_FILED_ID = "exc3-field";
  const EXC3_BUTTON_ID = "exc3-button";
  const EXC4_FILED_ID = "exc4-field";

  //end constants block
  init();

  function init() {
    console.log("loaded!");
    //exc1();
    //exc2();
    //exc3();
    //exc4();
  };

  function exc1() {
    let txtArea = document.getElementById(EXC1_TEXTAREA_ID);
    let saveButton = document.getElementById(EXC1_SAVE_BUTTON_ID);
    let saved = false;
    saveButton.addEventListener("click", () => {
      if (txtArea != "") {
        saved = true;
      }
    });

    //увы, но Starting in Chrome 51, a custom string will no longer be shown to the user.
    // Chrome will still show a dialog to prevent users from losing data,
    //but it's contents will be set by the browser instead of the web page.
    // поэтому только стандартное сообщения
    //https://developers.google.com/web/updates/2016/04/chrome-51-deprecations?hl=en#remove_custom_messages_in_onbeforeunload_dialogs
    window.onbeforeunload = function(e) {
      if (!saved) {
        var dialogText = "Вы не сохранили текст! Измения будут утеряны";
        e.returnValue = dialogText;
        return dialogText;
      }
    };
  } //end exc1

  function exc2() {
    let text = document.getElementById(EXC2_TEXT_ID);
    document.addEventListener("keydown", e => {
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

  function exc4() {
    document.addEventListener("keydown", e => {
      e.preventDefault();
      if ((e.keyCode = 0 || e.keyCode < 32)) {
        return;
      }
      switch (e.keyCode) {
        case 83: //нажата S
          if (e.ctrlKey && e.shiftKey) { //также нажаты ctr и shit
            alert("Сохранено всё");
          } else if (e.ctrlKey) { //также нажате ctr
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
