document.addEventListener("DOMContentLoaded", function() {
  //Constants block
  const MENU_CLASS = "menu";
  const EXC_RUN_BTN_CLASS = "runbtn";
  //end constants block
  init();

  function init() {
    console.log("loaded!");
    let bnts = [...document.getElementsByClassName(EXC_RUN_BTN_CLASS)];
    bnts.forEach(x => {
      x.addEventListener("click", e => {
        console.log(e.target.id);
        excChoise(e.target.id);
      });
    });

    let menu = [...document.getElementsByClassName(MENU_CLASS)];

    menu.forEach(item => {
      item.addEventListener("mouseover", () => {
        item.classList.add("menu-open");        
        item.childNodes[1].style.display = "block";
      });
      item.addEventListener("mouseout", () => {
        item.classList.remove("menu-open");
        item.childNodes[1].style.display = "none";
      });
    });
  }

  function excChoise(excNumber) {
    window.open(`${excNumber}.html`, name, "width=300px,heigth=300px");
  }
}); //end of onload
