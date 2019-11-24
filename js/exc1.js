document.addEventListener("DOMContentLoaded", function() {
    //Constants block
    const EXC1_TEXTAREA_ID = "exc1-textarea";
    const EXC1_SAVE_BUTTON_ID = "exc1-save-button";
    //end constants block
    init();
  
    function init() {
      console.log("loaded!");
      exc1();
    }
  
    function exc1() {
      console.log("run exc1");
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
  
  }); //end of onload
  