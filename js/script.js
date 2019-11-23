document.addEventListener("DOMContentLoaded", function() {
  //Constants block
  const EXC1_TEXTAREA_ID = "exc1-textarea";
  const EXC1_SAVE_BUTTON_ID = "exc1-save-button";
  const EXC2_TEXT_ID = "exc2-text";
  const EXC3_FILED_ID = "exc3-field";
  const EXC3_BUTTON_ID = "exc3-button";

  //end constants block
  init();

  function init() {
    console.log("loaded!");
    // exc1();
    //exc2();
    exc3();
  }

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

      bnt.addEventListener("mouseover", function (e) {
        elemRun(this, e);
    });

    function elemRun(elem, event){
        console.log(event.clientX, elem.offsetLeft);
        elem.style.left += 100+'px';
    }
    //   bnt.addEventListener('mouseover',(e)=>{
    //     console.log(e.clientX, e.target.offsetLeft);
    //     e.target.offsetLeft = e.clientX;
    //     console.log(e.clientX, e.target.offsetLeft);

    //   });
  }
}); //end of onload
